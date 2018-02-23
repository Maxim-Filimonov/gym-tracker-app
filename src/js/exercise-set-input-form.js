import $ from "jquery";

export default class ExerciseSetInputForm {
  constructor(props) {
    this.state = {
     displayInputForm: props.displayInputForm || false
    }
    this.props = props;
  }
  addExerciseSetButtonFormHTML() {
    return `<form role="form" class="add-set-button-form">
              <button class="btn btn-small btn-add-set"><i class="fa fa-plus-square-o"></i> Add Set</button>
            </form>`;
  }
  exerciseSetInputFormHTML(set, saveButtonLabel) {
    return `<form role="form" class="set-input-form">
              <div class="inline-form-input">
                <label for="setWeight">Weight: </label>
                <input value="${set && set.weight ? set.weight : ''}" type="text" id="setWeight" name="weight" placeholder="E.g. 10 or Body Weight" required>
              </div>
              <div class="inline-form-input">
                <label for="setReps">Reps: </label>
                <input value="${set && set.reps ? set.reps : ''}" type="number" id="setReps" name="reps" placeholder="Number of reps" required>
              </div> 
              <button class="btn btn-small btn-save-set">
                <i class="fa fa-${set && set.reps && set.weight ? 'check' : 'plus-square-o'}" aria-hidden="true"></i> ${saveButtonLabel}
              </button>
              <button class="btn btn-small btn-cancel-add-set">
                <i class="fa fa-ban" aria-hidden="true"></i> Cancel
              </button>
            </form>`;
  }
  bindCancelEvent(parent) {
    // Event for click cancel button
    $(parent).on('click', '.btn-cancel-add-set', (event) => {
      event.preventDefault();
      $(parent).unbind();
      this.state.displayInputForm = false;
      this.render(parent);
    });
  }
  bindSubmitForm(parent) {
    // Event for submit 'add set' button
    $(parent).on('submit', 'set-input-form', (event) => {
      event.preventDefault();
      const weight = $(event.currentTarget).find('input[name=weight]').val();
      const reps = $(event.currentTarget).find('input[name=reps]').val();
      this.state.displayInputForm = false;
      this.props.onSubmitForm(weight, reps);
      this.render(parent);
    });
  }
  bindAddButtonFormEvent(parent) {
    // submit event for 'add new set' button
    $(parent).on('submit', '.add-set-button-form', (event) => {
      event.preventDefault();
      this.state.displayInputForm = true;
      this.render(parent);
    })
  }
  render(parent) {
    if (this.state.displayInputForm) {
      parent.html(this.exerciseSetInputFormHTML(this.props.exerciseSet, this.props.saveButtonLabel));
      this.bindCancelEvent(parent);
      this.bindSubmitForm(parent);
    } else {
      const addExerciseSetForm = this.addExerciseSetButtonFormHTML();
      parent.html(addExerciseSetForm);
      this.bindAddButtonFormEvent(parent);
    }
  }
}
