import React, { useEffect, useState, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

// http request
import httpRequest from "../../config/axios.config";
import homeUrl from "../../config/url";

import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// components
import Form from "../../components/Form/Form";

const ShowForm = ({ history, setNotification }) => {
  // data
  const [data, setData] = useState({});

  // for fetching form
  const fetchForm = useCallback(async () => {
    let id = history.location.search.slice(1);
    try {
      // fetching form
      let response = await httpRequest({
        method: "GET",
        url: `${homeUrl}api/public/search/${id}`,
      });

      setData(response.data.data);
    } catch (err) {
      setNotification({
        severity: "error",
        open: true,
        msg:
          !!err.response && !!err.response.data
            ? err.response.data.msg
            : "Sorry! server is down",
      });
    }
  }, [history, setNotification]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  return <Fragment>{!isEmpty(data) && <Form data={data} />}</Fragment>;
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

export default connect(null, mapDispatchToProps)(ShowForm);
