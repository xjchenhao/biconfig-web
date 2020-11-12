<template>
  <div>
    <a-row
      type="flex"
      align="bottom"
    >
      <a-col :span="12">
        <a-radio-group
          v-model:value="value1"
          button-style="solid"
        >
          <a-radio-button value="a">
            全部
          </a-radio-button>
          <a-radio-button value="b">
            昨天
          </a-radio-button>
          <a-radio-button value="c">
            今天
          </a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col
        :span="12"
        style="text-align:right"
      >
        <a-range-picker
          v-model:value="value3"
          @change="onChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Radio, Row, Col, DatePicker } from 'ant-design-vue';

export default {
  components: {
    aRangePicker: DatePicker.RangePicker,
    aRadioButton: Radio.Button,
    aRadioGroup: Radio.Group,
    aRow: Row,
    aCol: Col,
  },
  data() {
    return {
      value1: 'a',
      value3: [],
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>

<style>

</style>
