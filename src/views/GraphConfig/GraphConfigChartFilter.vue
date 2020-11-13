<template>
  <div>
    <a-row
      type="flex"
      align="bottom"
    >
      <a-col :span="12">
        <a-radio-group
          v-model:value="timeType"
          button-style="solid"
          @change="handleFixedChange"
        >
          <a-radio-button value="1">
            今天
          </a-radio-button>
          <a-radio-button value="2">
            本周
          </a-radio-button>
          <a-radio-button value="3">
            本月
          </a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col
        :span="12"
        style="text-align:right"
      >
        <a-range-picker
          v-model:value="dateValue"
          @change="handleTimeIntervalChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { Radio, Row, Col, DatePicker } from 'ant-design-vue';

export default {
  components: {
    aRangePicker: DatePicker.RangePicker,
    aRadioButton: Radio.Button,
    aRadioGroup: Radio.Group,
    aRow: Row,
    aCol: Col,
  },
  emits: [ 'update' ],
  data() {
    return {
      timeType: '1', // 时间分类
      dateValue: null, // 所选时间间隔
    };
  },
  computed: {
    result() {
      switch (this.timeType) {
        case '1':
          return {
            startTime: dayjs().startOf('day'),
            endTime: dayjs().endOf('day'),
          };
        case '2':
          return {
            startTime: dayjs().startOf('week'),
            endTime: dayjs().endOf('week'),
          };
        case '3':
          return {
            startTime: dayjs().startOf('month'),
            endTime: dayjs().endOf('month'),
          };

        default:
          return {
            startTime: dayjs(this.dateValue[0]).startOf('day'),
            endTime: dayjs(this.dateValue[1]).endOf('day'),
          };
      }
    },
  },
  methods: {
    handleFixedChange() {
      this.dateValue = null;

      this.renderChart();
    },
    handleTimeIntervalChange(value) {
      this.timeType = value ? '' : '1';
      this.renderChart();
    },
    renderChart() {
      const { startTime, endTime } = this.result;

      this.$emit('update', {
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf(),
      });
    },
  },
};
</script>

<style>

</style>
