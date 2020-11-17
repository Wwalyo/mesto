const { default: Popup } = require("./popup");

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;  
    this._form = this._popup.querySelector('.content-form');
    
  }

  open(id) {
    super.open();
    this._form.id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log('PopupWithConfirm.setEventListeners');
    console.log(this._form);
    this._form.addEventListener('submit', (evt) => { 
                                                      evt.preventDefault();
                                                      this._submitForm(this._form);
                                                    });
  }
  close() {
    super.close();
    this._form.removeEventListener('submit', (evt) => { 
                                                        evt.preventDefault();                                                
                                                        this._submitForm(this._form.id);
                                                      });
  }
}