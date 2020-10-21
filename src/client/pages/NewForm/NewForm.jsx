import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import {
  DELETE_FIELD,
  UPDATE_FIELD,
  CREATE_FIELD,
} from "../../redux/actions/field.action";

import useStyles from "./newform.style";

import httpRequest from "../../config/axios.config";

// config
import homeUrl from "../../config/url";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

import Link from "../../components/Link/Link";

const NewForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState("");

  const { fields } = props;

  const [data, setData] = useState({
    question: "",
    showEdit: {},
  });

  const { question } = data;

  const [title, setTitle] = useState({
    flag: false,
    name: "UnTitled",
  });

  const inputHandler = (e) => {
    setData({
      ...data,
      question: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.createTodo(data.question);
    setData({
      ...data,
      question: "",
    });
  };

  const deleteFieldHandler = (id) => {
    props.deleteTodo(id);
  };

  const editFieldHandler = (id) => {
    setData({
      ...data,
      showEdit: { ...data.showEdit, [id]: true },
    });
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    props.updateTodo(e.target.id.value, e.target.question.value);
    setData({
      ...data,
      showEdit: { ...data.showEdit, [e.target.id.value]: false },
    });
  };

  const titleHandler = (e) => {
    setTitle({
      ...title,
      name: e.target.value,
    });
  };

  const titleSaveHandler = (e) => {
    if (e.key === "Enter") {
      setTitle({
        ...title,
        flag: false,
      });
    }
  };

  const generateLinkHandler = async () => {
    let data = {
      title: title.name,
      fields: JSON.stringify(fields),
    };

    try {
      let response = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/protected/create`,
        data,
      });
      setOpen(true);
      setLink(response.data.data);
      props.setNotification({
        severity: "success",
        open: true,
        msg: response.data.msg,
      });
    } catch (err) {
      props.setNotification({
        severity: "error",
        open: true,
        msg:
          !!err.response && !!err.response.data
            ? err.response.data.msg
            : "Sorry! server is down",
      });
    }
  };

  return (
    <div
      style={{
        display: "relative",
        width: "100%",
        paddingLeft: "30%",
      }}
    >
      <div className={classes.main}>
        <div>
          {!title.flag ? (
            <h2 onDoubleClick={() => setTitle({ ...title, flag: true })}>
              {title.name}
            </h2>
          ) : (
            <input
              type="text"
              name="title"
              value={title.name}
              onChange={titleHandler}
              style={{ width: "400px", marginBottom: "20px", height: "40px" }}
              placeholder="Add form title"
              onKeyPress={titleSaveHandler}
            />
          )}
          <div>
            <input
              type="text"
              name="question"
              value={question}
              onChange={inputHandler}
              style={{ width: "300px", marginBottom: "20px" }}
              placeholder="Add a new field"
            />
            <button
              className="btn fas fa-plus"
              title="add"
              onClick={submitHandler}
              disabled={!question}
              style={{ marginLeft: "2%" }}
            ></button>
            <button
              className="btn fas fa-share-alt"
              title="generate link"
              disabled={fields.length === 0}
              onClick={generateLinkHandler}
              style={{ marginLeft: "2%", marginRight: "2%" }}
            ></button>
          </div>
          <div>
            <ul className={classes.list}>
              {fields.map((field, idx) => {
                return (
                  <Fragment key={idx}>
                    {data.showEdit[field.id] ? (
                      <form onSubmit={editSubmitHandler}>
                        <input
                          type="text"
                          name="question"
                          defaultValue={field.question}
                          style={{ width: "300px" }}
                        />
                        <input
                          type="text"
                          name="id"
                          defaultValue={field.id}
                          hidden
                        />
                        <button
                          type="submit"
                          className="btn fas fa-pencil-alt"
                          question="edit"
                          disabled={false}
                        ></button>
                      </form>
                    ) : (
                      <li
                        onClick={() => editFieldHandler(field.id)}
                        className={classes.items}
                      >
                        <button
                          className="btn far fa-trash-alt"
                          title="delete"
                          onClick={() => deleteFieldHandler(field.id)}
                          style={{ marginRight: "2%" }}
                        ></button>
                        {field.question}
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Link data={link} open={open} setOpen={setOpen} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fields: state.fields,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (question) =>
      dispatch({ type: CREATE_FIELD, payload: question }),
    deleteTodo: (id) => dispatch({ type: DELETE_FIELD, payload: id }),
    updateTodo: (id, question) =>
      dispatch({ type: UPDATE_FIELD, payload: { id, question } }),
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
