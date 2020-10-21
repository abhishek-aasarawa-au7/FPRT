import React, { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Box from "@material-ui/core/Box";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import httpRequest from "../../config/axios.config";
import homeUrl from "../../config/url";

// styles
import useStyles from "./formlist.style";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

const FormList = ({ setNotification, history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [inputData, setInputData] = useState([]);

  const getForms = useCallback(async () => {
    if (inputData.length === 0) {
      try {
        let response = await httpRequest({
          method: "GET",
          url: `${homeUrl}api/protected/forms`,
          data: null,
        });
        if (inputData.length !== response.data.data.length)
          setInputData(response.data.data);
        return;
      } catch (err) {
        console.log(err);
        setNotification({
          severity: "error",
          open: true,
          msg:
            !!err.response && !!err.response.data
              ? err.response.data.msg
              : "Sorry! server is down",
        });
      }
    }
  }, [inputData, setNotification]);

  useEffect(() => {
    getForms();
  }, [getForms]);

  const onClickHandler = (e) => {
    // changing route
    history.push("/create");
  };

  return (
    <Fragment>
      <Grid container className={classes.notebook}>
        <Fragment>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              minHeight: "58vh",
              minWidth: "70vw",
              flexWrap: "wrap",
            }}
          >
            <Box
              key="add"
              width={280}
              height={200}
              id={0}
              marginRight={2}
              my={5}
              className={classes.list_container}
            >
              <Card className={classes.root} variant="outlined">
                <CardContent
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  <Button
                    type="button"
                    width="50%"
                    variant="outlined"
                    color="secondary"
                    style={{
                      fontSize: "100",
                      color: theme.palette.secondary.main,
                      marginTop: "30px",
                    }}
                    onClick={() => history.push("/create")}
                  >
                    ADD
                  </Button>
                </CardContent>
              </Card>
            </Box>
            {inputData.length > 0 &&
              inputData.map((item, index) => (
                <Box
                  key={index}
                  width={280}
                  height={200}
                  id={index}
                  marginRight={2}
                  my={5}
                  className={classes.list_container}
                  onClick={onClickHandler}
                >
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="secondary">
                        {item.title}
                      </Typography>
                      <Box pt={0.5}>
                        <Typography className={classes.pos} color="secondary">
                          Created On : {item.createdOn}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
          </div>
        </Fragment>
      </Grid>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(FormList));
