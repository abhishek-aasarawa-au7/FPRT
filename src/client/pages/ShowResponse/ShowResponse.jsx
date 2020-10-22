import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

import httpRequest from "../../config/axios.config";
import homeUrl from "../../config/url";

// components
import ResponseList from "../../components/ResponseList/ResponseList";

const ShowResponse = ({ setNotification, history }) => {
  // data state
  const [data, setData] = useState({});

  let id = history.location.search.slice(1);

  // get response
  const getResponses = useCallback(async () => {
    try {
      let response = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/protected/responses`,
        data: { id },
      });

      console.log("form==>", response.data);

      let resp = response.data.data.resp;

      let quest = JSON.parse(response.data.data.ques);

      setData({ resp, quest });
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
  }, [setNotification, id]);

  useEffect(() => {
    getResponses();
  }, [getResponses]);

  return (
    <div>
      {!isEmpty(data) && (
        <ResponseList responses={data.resp} questions={data.quest} />
      )}
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

export default connect(null, mapDispatchToProps)(ShowResponse);
