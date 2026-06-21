<template>
  <div id="available-cash-area">
    <div class="cash-display">
      <label for="available-cash">Available Cash:</label>
      <dollar-format-input
        id="available-cash"
        :value="availableCash"
        @input="updateAvailableCash($event)"
      />
    </div>

    <div class="cash-operations">
      <div class="operation-group">
        <label>Pay:</label>
        <dollar-format-input
          :value="payAmount"
          @input="payAmount = $event"
        />
        <button @click="performPay" class="pay-button">Pay</button>
      </div>

      <div class="operation-group">
        <label>Receive:</label>
        <dollar-format-input
          :value="receiveAmount"
          @input="receiveAmount = $event"
        />
        <button @click="performReceive" class="receive-button">Receive</button>
      </div>

      <div class="operation-group">
        <button @click="receiveCashFlowAmount" class="cash-flow-button">
          Receive Cash Flow
        </button>
        <sub>Current: {{ cashFlowFormatted }}</sub>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import DollarFormatInput from "@/components/misc/DollarFormatInput.vue";

export default {
  components: { DollarFormatInput },
  data() {
    return {
      payAmount: 0,
      receiveAmount: 0
    };
  },
  computed: {
    ...mapState("meta", ["availableCash"]),
    ...mapGetters(["cashFlow"]),
    cashFlowFormatted() {
      return `$${this.cashFlow.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
  },
  methods: {
    ...mapMutations("meta", ["setAvailableCash", "payCash", "receiveCash"]),
    updateAvailableCash(value) {
      this.setAvailableCash(value);
    },
    performPay() {
      if (this.payAmount > 0) {
        this.payCash(this.payAmount);
        this.payAmount = 0;
      }
    },
    performReceive() {
      if (this.receiveAmount > 0) {
        this.receiveCash(this.receiveAmount);
        this.receiveAmount = 0;
      }
    },
    receiveCashFlowAmount() {
      this.receiveCash(this.cashFlow);
    }
  }
};
</script>

<style lang="scss" scoped>
#available-cash-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.cash-display {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;

  label {
    font-weight: 700;
    white-space: nowrap;
    flex: 0 0 auto;
  }

  input {
    flex: 1 0 150px;
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.cash-operations {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.operation-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  label {
    font-weight: 600;
    flex: 0 0 70px;
  }

  input {
    flex: 1 0 120px;
    min-width: 80px;
  }

  button {
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s, transform 0.1s;

    &:hover {
      transform: scale(1.02);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .pay-button {
    background-color: #ff6b6b;
    color: white;

    &:hover {
      background-color: #ff5252;
    }
  }

  .receive-button {
    background-color: #51cf66;
    color: white;

    &:hover {
      background-color: #37b24d;
    }
  }

  .cash-flow-button {
    background-color: black;
    color: white;
    flex: 0 0 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;

    &:hover {
      background-color: black;
    }
  }

  sub {
    flex: 0 0 100%;
    color: #666;
    font-size: 0.875rem;
    text-align: right;
    padding-right: 0.5rem;
  }
}

@media (max-width: 600px) {
  #available-cash-area {
    padding: 0.75rem;
    gap: 1rem;
  }

  .operation-group {
    flex-direction: column;
    align-items: stretch;

    label {
      flex: 0 0 auto;
    }

    input,
    button {
      flex: 1 0 auto;
    }

    .pay-button,
    .receive-button {
      flex: 1 0 auto;
    }

    sub {
      flex: 0 0 auto;
      padding-right: 0;
    }
  }
}
</style>
