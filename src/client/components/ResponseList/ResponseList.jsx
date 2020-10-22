import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { map } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  square: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  rounded: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function ResponseList({ responses = [], questions = [] }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {map(responses, (resp, idx) => {
        return (
          <div key={idx}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar variant="square" className={classes.rounded}>
                  {idx + 1}
                </Avatar>
              </ListItemAvatar>
              <List>
                {map(JSON.parse(resp), (ele, i) => (
                  <ListItem alignItems="flex-start" key={`f${i + idx + 1}`}>
                    <ListItemText
                      primary={questions[i].question}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {ele}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
