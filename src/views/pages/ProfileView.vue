<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <h1>Profile</h1>
      <div class="card">
        <div class="text">
          <img
            src="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png"
            alt=""
          />
          <h3>{{ userDetails.name }}</h3>
          <p>Email : {{ userDetails.email }}</p>
          <p>Join at : {{ userDetails.create_at }}</p>
        </div>
        <!-- Button trigger modal -->
        <div class="d-flex gx-5 col-md-12">
          <div class="col-md-6">
            <button
            type="button"
            class="btn btn-primary"
            @click="setDafaultName()"
          >
            Edit profile
          </button>
          </div>
          <div class="col-md-6">
            <button
            type="button"
            class="btn btn-primary"
            @click="openModalChangePassword()"
          >
            Change Password
          </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Profile -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="saveEditProfile()">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Edit Profile</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="userEdit.name"
                  id="name"
                  @keydown="resetErrorsDetails()"
                />
                <span
                  class="text-danger"
                  v-if="errorsDetails['name']"
                  v-text="errorsDetails.name.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Modal Change password -->
    <div
      class="modal fade"
      id="changePasswordModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="changePasswordLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="saveNewPassword()">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changePasswordLabel">Edit Profile</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <label for="old_password" class="form-label">Old Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.oldPassword"
                  id="old_password"
                  @keydown="resetErrorsPassword()"
                />
                <span
                  class="text-danger"
                  v-if="errorsPassword['oldPassword']"
                  v-text="errorsPassword.oldPassword.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <label for="new_password" class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.newPassword"
                  id="new_password"
                  @keydown="resetErrorsPassword()"
                />
                <span
                  class="text-danger"
                  v-if="errorsPassword['newPassword']"
                  v-text="errorsPassword.newPassword.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <label for="new_password_confirmation" class="form-label">New Password Confirmation</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.newPasswordConfirmation"
                  id="new_password_confirmation"
                  @keydown="resetErrorsPassword()"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { mapGetters, mapActions } from "vuex";
import fixSwal from "../../swal/index.js";
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      user: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      },
      userEdit: {
        name: "",
      },
      errorsPassword: {},
      errorsDetails: {},
      modalChangeDetails: null,
      modalChangePassword: null,
    };
  },
  computed: {
    ...mapGetters({
      userDetails: "user/userDetails",
      notifications: 'application/notifications'
    }),
  },
  methods: {
    ...mapActions({
      changePassword: 'user/changePassword',
      changeDetails: 'user/changeDetails',
      addNotification: 'application/addNotification'
    }),
    saveEditProfile() {
      this.changeDetails(this.userEdit).then((res) => {
        this.addNotification(res.data.message).then(() => {
          fixSwal.toastSuccess(this.notifications);
          this.modalChangeDetails.hide();
        });
      }).catch((error) => {
        if (error.response.status === 422) {
          this.errorsDetails = error.response.data.errors;
        } else {
          this.addNotification(error.response.data.message).then(() => {
            fixSwal.toastError(this.notifications);
          });
        }
      });
    },
    saveNewPassword() {
      this.changePassword(Object.assign({},this.user, {
        newPassword_confirmation: this.user.newPasswordConfirmation
      })).then((res) => {
        this.addNotification(res.data.message).then(() => {
          fixSwal.toastSuccess(this.notifications);
          this.modalChangePassword.hide();
        });
      }).catch((error) => {
        if (error.response.status === 422) {
          this.errorsPassword = error.response.data.errors;
        } else {
          this.addNotification(error.response.data.message).then(() => {
            fixSwal.toastError(this.notifications);
          });
        }
      });
    },
    setDafaultName(){
      this.userEdit.name = this.userDetails.name;
      this.modalChangeDetails = new Modal(document.getElementById('staticBackdrop'), {});
      this.modalChangeDetails.show();
    },
    openModalChangePassword(){
      this.modalChangePassword = new Modal(document.getElementById('changePasswordModal'), {});
      this.modalChangePassword.show();
    },
    resetErrorsPassword(){
      this.errorsPassword = {};
    },
    resetErrorsDetails(){
      this.errorsDetails = {};
    }
  },
};
</script>

<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}

.card .text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card .text img {
  height: 170px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.card .text h3 {
  font-size: 40px;
  font-weight: 400;
}

.card .text p:nth-of-type(1) {
  color: rgb(35, 182, 219);
  font-size: 15px;
  margin-top: -5px;
}

.card .text p:nth-of-type(2) {
  margin: 10px;
  width: 90%;
  text-align: center;
}
</style>
