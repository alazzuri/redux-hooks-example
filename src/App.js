import React, { useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  data as dataState,
  loadingStatus,
  togleModal,
} from "./app/store/reducers/modalSlice";
import ModalContainer from "./app/features/Modal/Modal.container";

const App = () => {
  // Hook to dispatch actions
  const dispatch = useDispatch();

  // Retrieving data from the state using redux hooks
  const status = useSelector(loadingStatus);
  const data = useSelector(dataState);

  // dispatch an action
  const toggle = () => dispatch(togleModal());

  useEffect(() => {
    if (status === "success" && Object.keys(data)) {
      alert(`Data submitted: ${JSON.stringify(data)}`);
    }
  }, [status, data]);

  return (
    <div className="d-flex justify-content-center align-items-center container-fluid mt-5">
      {status !== "loading" ? (
        <Button color="danger" onClick={toggle}>
          Open Modal
        </Button>
      ) : (
        <div>
          <Spinner type="grow" color="danger" children={null} />
        </div>
      )}
      <ModalContainer toggle={toggle} />
    </div>
  );
};

export default App;
