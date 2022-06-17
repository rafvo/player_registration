<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form ref="form">
        <v-card>
          <v-list-item class="sticky-top border-bottom">
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Cadastro de Jogador
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <ConfirmDialog
                @confirm="insert"
                button-text="Me inscrever"
                max-width="900px"
                message="Tem Certeza que deseja efetuar o cadastro?"
                confirm-action="Sim, Desejo me inscrever"
                :loading="inserting"
                :validate-before-opening="invalid"
                @beforeShow="validate"
              >
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <FieldConfirmationItem
                      label="Nome Completo"
                      icon="mdi-format-text-rotation-none"
                      :value="player.name"
                    />
                    <FieldConfirmationItem
                      label="Nome de Usuário"
                      icon="mdi-account"
                      :value="player.user_name"
                    />
                    <FieldConfirmationItem
                      label="E-mail"
                      icon="mdi-email"
                      :value="player.email"
                    />
                    <FieldConfirmationItem
                      label="Data de Nascimento"
                      icon="mdi-cake"
                    >
                      {{ player.birth | us_to_br_date }}
                    </FieldConfirmationItem>
                  </v-col>
                </v-row>
              </ConfirmDialog>
            </v-list-item-action>
          </v-list-item>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <TextField
                  v-model="player.name"
                  :bind-value="player.name"
                  label="Nome Completo"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <UserNameField
                  v-model="player.user_name"
                  :bind-value="player.user_name"
                  label="Nome de Usuário"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="9">
                <EmailField
                  v-model="player.email"
                  :bind-value="player.email"
                  rules="required"
                  required-label
                />
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <BirthDayField
                  v-model="player.birth"
                  :bind-value="player.birth"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <PasswordField
                  v-model="player.password"
                  with-confirmation
                  :grid="6"
                  rules="required"
                  required-label
                />
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <pre>
            {{ player }}
          </pre> -->
        </v-card>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import Player from "@/domain/models/player";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import FieldConfirmationItem from "@/components/item/FieldConfirmationItem.vue";
import TextField from "@/components/fields/TextField.vue";
import EmailField from "@/components/fields/EmailField.vue";
import BirthDayField from "@/components/fields/BirthDayField.vue";
import PasswordField from "@/components/fields/PasswordField.vue";
import UserNameField from "@/components/fields/UserNameField.vue";

export default {
  components: {
    ConfirmDialog,
    FieldConfirmationItem,
    TextField,
    EmailField,
    BirthDayField,
    PasswordField,
    UserNameField,
  },
  props: {
    player: {
      type: Object,
      default: () => new Player(),
      required: false,
    },
  },
  data() {
    return {
      inserting: false,
    };
  },
  methods: {
    validate() {
      return this.$refs.observer.validate();
    },
    async insert() {
      var valid = await this.validate();
      if (!valid) return;

      this.inserting = true;
      setTimeout(() => {
        this.$toast.success("Você foi cadastrado com sucesso", {
          timeout: 2000,
        });
        this.reset();
        this.inserting = false;
      }, 1000);
    },
    reset() {
      this.$refs.form.reset();

      this.$nextTick(() => {
        this.$refs.observer.reset();
      });

      this.player.create(new Player());
    },
  },
};
</script>

<style scoped>
.sticky-top {
  top: 0;
  position: sticky !important;
  height: 100% !important;
  background: #fff !important;
  z-index: 3000;
}

.border-bottom {
  border-bottom: 1px solid #fafafa;
}
</style>