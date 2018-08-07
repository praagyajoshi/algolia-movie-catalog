import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModalHolder from '../../presentation/Modal/Holder';
import AddMovieForm from '../../presentation/AddMovie/Form';
import ModalBodyNotification from '../../presentation/Modal/Notification';

import { addMovieAPI } from '../../dataProviders/API';

class AddMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      saveSuccessful: false,
      isProcessing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive && nextProps.isActive) {
      this.showModal();
    } else {
      this.hideModal();
    }
  }

  showModal() {
    /**
     * Making sure that the background can't scroll
     * when this modal is active.
     */
    document.documentElement.classList.add('is-clipped');
    this.setState({
      isActive: true
    });
  }

  hideModal() {
    document.documentElement.classList.remove('is-clipped');
    this.setState({
      isActive: false
    });
  }

  handleCloseClick() {
    this.props.closeButtonClickCallback();
  }

  onFormCancel() {
    this.props.closeButtonClickCallback();
  }

  onFormSubmit(formData) {
    this.setState({
      isProcessing: true
    }, () => this.saveMovie(formData));
  }

  saveMovie(formData) {
    addMovieAPI(formData, (error, response) => {
      if (error) {
        this.setState({
          isProcessing: false
        }, () => {
          alert('Something went wrong! Please try again.');
        });
      } else if (response) {
        if (response.status === 201) {
          /**
           * Updating the state to show a success message, and to
           * reset the form.
           */
          this.setState({
            saveSuccessful: true,
            isProcessing: false
          });

          /**
           * Waiting for a little while before closing the modal
           * automatically.
           */
          setTimeout(() => {
            this.setState({
              saveSuccessful: false
            });
            this.props.closeButtonClickCallback();
          }, 3000);
        }
      }
    });
  }

  render() {
    return (
      <ModalHolder
        title="Add movie"
        isActive={this.state.isActive}
        closeCallback={() => this.handleCloseClick()}>

        <AddMovieForm
          clearState={this.state.saveSuccessful}
          isProcessing={this.state.isProcessing}
          submitClickCallback={(formData) => this.onFormSubmit(formData)}
          cancelClickCallback={() => this.onFormCancel()} />

        {this.state.saveSuccessful &&
          <ModalBodyNotification message="Movie saved successfully!" />
        }

      </ModalHolder>
    );
  }
}

AddMovieModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  closeButtonClickCallback: PropTypes.func.isRequired
}

export default AddMovieModal;
