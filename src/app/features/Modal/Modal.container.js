import React, { useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ModalComponent from "./Modal";
import {
  selectedInput as selectedInputState,
  showModal as showModalState,
  recipients as recipientsState,
  togleModal,
  selectInput,
  setRecipients,
  submitAsync,
} from "../../store/reducers/modalSlice";

const ModalContainer = () => {
  // Hook to dispatch actions
  const dispatch = useDispatch();

  // Retrieving data from the state using redux hooks
  const showModal = useSelector(showModalState);
  const selectedInput = useSelector(selectedInputState);
  const recipients = useSelector(recipientsState, shallowEqual);

  // Callbacks to dispatch actions when something happens in the modal form
  const onChangeModal = () => dispatch(togleModal());
  const onSelectInput = (e) => dispatch(selectInput(e.target.value));

  const onSubmitData = () => {
    const dataToSubmit = { recipients, options: { selectedInput } };

    onChangeModal();

    // This dispatch an async action using thunk
    dispatch(submitAsync(dataToSubmit));
  };

  const onChangeRecipients = (e) => {
    const recipients = e.target.value;
    const parsedRecipients = recipients.split(";");

    dispatch(setRecipients(parsedRecipients));
  };

  const memoizedRecipients = useMemo(() => recipients, [recipients]);

  return (
    <ModalComponent
      title="Email Popup"
      showModal={showModal}
      toggle={onChangeModal}
      onSelectInput={onSelectInput}
      onChangeRecipients={onChangeRecipients}
      recipients={memoizedRecipients}
      selectInput={selectInput}
      selectedInput={selectedInput}
      onClickSend={onSubmitData}
    />
  );
};

export default ModalContainer;
