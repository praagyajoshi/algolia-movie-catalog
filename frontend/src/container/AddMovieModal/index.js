import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormData from 'form-data';

import AddMovieForm from '../../presentation/AddMovieForm';

import Axios from '../../dataProviders/Axios';

class AddMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
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
    document.body.classList.add('is-clipped');
    this.setState({
      isActive: true
    });
  }

  hideModal() {
    document.body.classList.remove('is-clipped');
    this.setState({
      isActive: false
    });
  }

  handleCloseClick(e) {
    e.preventDefault();
    this.props.closeButtonClickCallback();
  }

  onFormSubmit(receivedFormData) {
    /**
     * Creating multipart form data for the
     * post request along with the image
     */
    let data = new FormData();
    if (receivedFormData.hasOwnProperty('uploaded_image')) {
      data.append(
        'uploaded_image',
        receivedFormData.uploaded_image,
        receivedFormData.uploaded_image.name
      );
    }

    /**
     * Processing parameters other than the image
     */
    for (var key in receivedFormData) {
      if (receivedFormData.hasOwnProperty(key) &&
          key !== 'uploaded_image') {
        data.append(key, receivedFormData[key]);
      }
    }

    this.saveMovie(data);
  }

  onFormCancel() {
    this.props.closeButtonClickCallback();
  }

  saveMovie(formData) {
    Axios.post(
      'movies',
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      }
    ).then((response) => {
      if (response.status === 201) {
        console.log('Saved successfully!');
      }
    }).catch((error) => {
      alert('Something went wrong! Please try again.');
    });
  }

  render() {
    const modalClasses = classNames({
      'modal': true,
      'is-active': this.state.isActive
    });

    return (
      <div className={modalClasses}>
        <div className="modal-background" onClick={(e) => this.handleCloseClick(e)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add movie</p>
            <button
              className="delete"
              aria-label="close"
              onClick={(e) => this.handleCloseClick(e)}>
            </button>
          </header>

          <section className="modal-card-body">
            <AddMovieForm
              submitClickCallback={(formData) => this.onFormSubmit(formData)}
              cancelClickCallback={() => this.onFormCancel()} />
          </section>
        </div>
      </div>
    );
  }
}

AddMovieModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  closeButtonClickCallback: PropTypes.func.isRequired
}

export default AddMovieModal;
