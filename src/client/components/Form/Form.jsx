import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { map } from "lodash";
import { withRouter } from "react-router";

// styles
import useStyles from "./form.style";

// http request
import httpRequest from "../../config/axios.config";
import homeUrl from "../../config/url";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

const Form = ({ data, setNotification, history }) => {
  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    let list = [];

    for (let i = 0; i < JSON.parse(data.fields).length; i++) {
      let value = e.target[`question-${i}`].value;
      list.push(value);
    }

    try {
      const response = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/public/save`,
        data: { resp: JSON.stringify(list), id: data._id },
      });

      setNotification({
        severity: "success",
        open: true,
        msg: response.data.msg,
      });

      //   redirecting to home page
      history.push("/");
    } catch (err) {
      setNotification({
        severity: "error",
        open: true,
        msg:
          !!err.response && !!err.response.data
            ? err.response.data.msg
            : "Sorry! Server is down.",
      });
    }
  };

  return (
    <div>
      <div>
        <div>
          <h3>
            <b>Author : </b>
            <em>{data.author.name}</em>
          </h3>
          <h3>
            <b>Created : </b>
            <span style={{ fontSize: 14 }}>{data.createdOn}</span>
          </h3>
        </div>
        <div>
          <Typography variant="h3" component="h3">
            {data.title}
          </Typography>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        {map(JSON.parse(data.fields), (ele, idx) => {
          return (
            <div key={idx}>
              <Typography variant="h6" component="h6">
                {ele.question}
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={`question-${idx + 1}`}
                name={`question-${idx}`}
              />
            </div>
          );
        })}
        <Button type="submit" variant="contained" color="primary">
          SUBMIT YOUR RESPONSE
        </Button>
      </form>
    </div>
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

export default connect(null, mapDispatchToProps)(withRouter(Form));
