<style lang="scss">
.toggle__label{
        color: white;
}
.active {
    span {
        color: green;
    }
}
</style>
<template>
    <div style="display: flex; flex-direction:column">
    <label :for="id + '_button'" :class="{'active': isActive}" class="toggle__button">
        <span v-if="isActive" class="toggle__label">{{ enableText }}</span>
        <span v-if="! isActive" class="toggle__label">{{ disabledText }}</span>

        <input type="checkbox" :disabled="disabled" :id="id + '_button'" v-model="checkedValue">
        <span class="toggle__switch"></span>
    </label>

    <router-link v-if="currentState == true" to="/eye-settings" class="nav-link">
        <font-awesome-icon icon="eye" /> 
        <font-awesome-icon icon="cog" /> Einstellungen
        <!-- {{ user.username }} -->
    </router-link>

    <!-- <b-form-group label="Wähle aus zwischen GazeCloudAPI und Webgazer als Tool für die berechnung des Punktes, wo die Augen hin schauen" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-options"
      ></b-form-radio-group>
    </b-form-group> -->
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        labelEnableText: {
            type: String,
            default: 'On'
        },
        
        labelDisableText: {
            type: String,
            default: 'Off'
        },

        id: {
            type: String,
            default: 'primary'
        }, 

        defaultState: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            currentState: this.defaultState
        }
    },

    watch: {
        defaultState: function defaultState() {
            this.currentState = Boolean(this.defaultState)
        }
    },

    computed: {
        // currentState() {
        //     return this.defaultState;
        // },

        isActive() {
            return this.currentState;
        },

        enableText() {
            return this.labelEnableText;
        },

        disabledText() {
            return this.labelDisableText;
        },

        checkedValue: {
            get() {
                return this.currentState;
            },

            set(newValue) {
                this.currentState = newValue;
                this.$emit('change', newValue);
            }
        }
    }
}
</script>

<style scoped>
.toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
    color: white;
    margin-bottom: 0rem !important;
}
.toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
}
.toggle__button .toggle__switch {
    display:inline-block;
    height:12px;
    border-radius:6px;
    width:40px;
    background: #BFCBD9;
    box-shadow: inset 0 0 1px #BFCBD9;
    position:relative;
    margin-left: 10px;
    transition: all .25s;
}

.toggle__button .toggle__switch::after, 
.toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
}

.toggle__button .toggle__switch::after {
    background: #4D4D4D;
    box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
    background: #4D4D4D;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    opacity:0;
}

.active .toggle__switch {
    background: #adedcb;
    box-shadow: inset 0 0 1px #adedcb;
}

.active .toggle__switch::after,
.active .toggle__switch::before{
    transform:translateX(40px - 18px);
}

.active .toggle__switch::after {
    left: 23px;
    background: #53B883;
    box-shadow: 0 0 1px #53B883;
}
</style>