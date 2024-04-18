<script setup lang="ts">
  import { ref, watch } from "vue";
  import Api from "@/services/Api";
  import { IUser } from "@/types";

  const headers = [
    { title: "User ID", key: "id" },
    { title: "First name", key: "name.firstname", sortable: false },
    { title: "Last name", key: "name.lastname", sortable: false },
    { title: "Email", key: "email", sortable: false },
    { title: "Phone number", key: "phone", sortable: false },
    { title: "Actions", key: "actions", sortable: false },
  ];

  const alignCenterProps = {
    align: "center",
  };

  const defaultUser = {
    id: -1,
    name: {
      firstname: "",
      lastname: "",
    },
    email: "",
    phone: "",
  };

  const data = ref<IUser[]>([]);
  const filteredData = ref<IUser[]>([]);
  const loading = ref(true);
  const dialog = ref(false);
  const dialogDelete = ref(false);
  const editedUser = ref<IUser>(defaultUser);
  const editedIndex = ref(-1);
  const dialogBtnLoading = ref(false);
  const searchByEmail = ref("");

  const close = () => {
    dialog.value = false;
  };

  const save = async () => {
    dialogBtnLoading.value = true;

    if (editedIndex.value > -1) {
      const res = await Api.updateUser(editedUser.value, {
        pathId: editedUser.value.id,
      });
      res && Object.assign(data.value[editedIndex.value], editedUser.value);
    } else {
      const res = await Api.addUser(editedUser.value);
      res && data.value.push({ ...editedUser.value, id: res.id });
    }

    dialogBtnLoading.value = false;
    close();
  };

  const setEditedUser = (item: IUser) => {
    editedUser.value = JSON.parse(JSON.stringify(item));
    editedIndex.value = data.value.indexOf(item);
  };

  const editUser = (item: IUser) => {
    setEditedUser(item);
    dialog.value = true;
  };

  const deleteUser = (item: IUser) => {
    setEditedUser(item);
    dialogDelete.value = true;
  };

  const closeDelete = () => {
    dialogDelete.value = false;
  };

  const deleteUserConfirm = async () => {
    dialogBtnLoading.value = true;

    const res = await Api.deleteUser(editedUser.value.id);
    dialogBtnLoading.value = false;

    if (!res) return;

    data.value.splice(editedIndex.value, 1);
    closeDelete();
  };

  const loadUsers = async (options: { sortBy: Array<{ order: string }> }) => {
    const sort = options.sortBy[0]?.order || "asc";
    loading.value = true;
    data.value = await Api.getUsers(sort);

    if (searchByEmail.value) {
      filteredData.value = data.value.filter((user) =>
        user.email.toLowerCase().includes(searchByEmail.value.toLowerCase()),
      );
    }

    loading.value = false;
  };

  watch(dialog, () => {
    !dialog.value && setEditedUser(defaultUser);
  });
  watch(dialogDelete, () => {
    !dialogDelete.value && setEditedUser(defaultUser);
  });
  watch(searchByEmail, () => {
    filteredData.value = data.value.filter((user) =>
      user.email.toLowerCase().includes(searchByEmail.value.toLowerCase()),
    );
  });
</script>

<template>
  <div class="main-container">
    <p class="users-title">Users Table</p>
    <v-data-table-server
      :header-props="alignCenterProps"
      :cell-props="alignCenterProps"
      :headers="headers"
      :items="filteredData.length ? filteredData : data"
      :items-length="filteredData.length"
      :loading="loading"
      height="510"
      fixed-header
      @update:options="loadUsers"
    >
      <template #top>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="343px">
          <template #activator="{ props }">
            <div class="table-top">
              <v-text-field
                v-model="searchByEmail"
                append-inner-icon="mdi-magnify"
                label="Search by Email"
                variant="outlined"
                class="search-email-field"
                single-line
                hide-details
                density="compact"
              ></v-text-field>
              <v-btn v-bind="props" class="add-user-btn">Add User</v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title class="dialog-header">
              <v-btn icon="mdi-close" variant="text" @click="close"></v-btn>
            </v-card-title>
            <v-card-text class="add-edit-dialog-content">
              <span class="dialog-title">
                {{ editedIndex === -1 ? "Add User" : "Edit User" }}
              </span>
              <v-container>
                <v-column class="dialog-content-inputs">
                  <v-text-field
                    v-model="editedUser.name.firstname"
                    variant="outlined"
                    label="First name"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    v-model="editedUser.name.lastname"
                    variant="outlined"
                    label="Last name"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    v-model="editedUser.email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    label="Email"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    v-model="editedUser.phone"
                    variant="outlined"
                    label="Phone number"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-column>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn
                variant="text"
                class="save-btn"
                append-icon="mdi-chevron-right"
                :loading="dialogBtnLoading"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="343px">
          <v-card>
            <v-card-title class="dialog-header">
              <v-btn
                icon="mdi-close"
                variant="text"
                @click="closeDelete"
              ></v-btn>
            </v-card-title>
            <v-card-text>
              <span class="dialog-title">Delete?</span>
              <p class="dialog-text">
                Are you sure you want to delete username
                {{ editedUser.name.firstname }}
                {{ editedUser.name.lastname }}?
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                variant="text"
                class="delete-btn"
                :loading="dialogBtnLoading"
                @click="deleteUserConfirm"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn class="edit-user-btn" @click="editUser(item)"> Edit </v-btn>
        <v-btn class="delete-user-btn" @click="deleteUser(item)">
          Delete
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/mixins";

  .main-container {
    margin-top: 35px;
    margin-bottom: 10px;
    padding: 0 40px;
    :global(.v-data-table-footer) {
      display: none !important;
    }
    :global(.v-data-table__td) {
      height: 64px !important;
    }
    :global(.v-data-table__td:last-child) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
    }
    @include mixins.tablet {
      margin-top: 10px;
      padding: 0 10px;
    }
  }
  .users-title {
    font-size: 28px;
    font-weight: 400;
    color: #000000;
    :global(.v-data-table-header__content) {
      font-weight: 700;
    }
    :global(.v-data-table__tr:hover) {
      background-color: #f7f6fe;
    }
  }
  .add-user-btn,
  .edit-user-btn,
  .delete-user-btn {
    color: white;
    border-radius: 48px;
    font-size: 12px;
    font-weight: 400;
    text-transform: none;
    height: 32px !important;
    padding: 0 16px;
    box-shadow: none;
    width: 80px;
    align-self: center;
    justify-self: center;
    &:hover,
    &:active,
    &:focus {
      box-shadow: none;
    }
  }
  .add-user-btn {
    align-self: flex-end;
    background-color: #0e9638;
  }
  .edit-user-btn {
    background-color: #90cffc;
  }
  .delete-user-btn {
    background-color: #8c939d;
  }
  .dialog-header {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    .v-btn {
      padding: 0;
      margin: 0;
    }
  }
  .dialog-title {
    color: #404b5b;
    font-size: 22px;
    font-weight: 500;
  }
  .dialog-text {
    color: #707b87;
    font-size: 16px;
    font-weight: 400;
  }
  .add-edit-dialog-content {
    padding: 8px 24px !important;
    .v-container {
      padding: 0;
    }
  }
  .v-card-actions {
    padding: 0 24px 24px 24px;
    .save-btn,
    .delete-btn {
      height: 56px;
      border-radius: 6px;
      width: 100%;
      color: #ffffff;
      font-size: 18px;
      font-weight: 400;
      text-transform: none;
      &:hover,
      &:active,
      &:focus {
        box-shadow: none;
      }
    }
    .save-btn {
      background-color: #104072;
    }
    .delete-btn {
      background-color: #9b0212;
    }
  }
  .table-top {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    .search-email-field {
      max-width: 300px;
    }
  }
  .dialog-content-inputs {
    display: grid;
    gap: 24px;
    padding: 24px 0;
  }
</style>
