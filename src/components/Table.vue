<template>
  <div class="table">
    <p class="table__text" v-if="transactions.length === 0">This block has no transactions</p>
    <table v-else>
      <thead>
        <th v-for="(item, i) in thead" :key="i">{{ item.name }}</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in transactions" :key="i">
          <td>{{ i }}</td>
          <td class="table__limit">{{ item.sender === null ? 'System' : item.sender}}</td>
          <td class="table__limit">{{ item.receiver }}</td>
          <td class="table__amount">{{ item.amount }} <span v-if="item.sender === null" class="table__reward">(Block reward)</span></td>
          <td class="table__time">{{ item.timeStamp }} <span class="table__convert">{{ convert(item.timeStamp) }}</span> </td>
          <td :style="{color: item.isValid() ? 'green' : 'red'}">{{ item.isValid() ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    transactions: Array
  },
  data() {
    return {
      thead: [
        {name: '#'},
        {name: 'From'},
        {name: 'To'},
        {name: 'Amount'},
        {name: 'Timestamp'},
        {name: 'Valid?'},
      ]
    }
  },
  methods: {
    convert(seconds) {
      const d = new Date(seconds);
      const month = new Intl.DateTimeFormat('en-US', { month: 'short'}).format(d.getMonth());
      const day = d.getDate();
      const year = d.getFullYear();
      const hour = d.getHours();
      const min = d.getMinutes();
      const cheak = (num) => num > 9 ? num : `0${num}`
      return `${month} ${cheak(day)}, ${year}, ${cheak(hour)}:${cheak(min)}`;
    }
  }
}
</script>

<style lang="scss">
.table {
  &__title {
    font-size: rem(40);
    font-weight: 600;
  }
  &__amount, &__time {
    position: relative;
  }
  &__reward, &__convert {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    font-size: rem(10);
    color: gray;
  }
  &__reward {
    // font-size: rem(8);
  }
  &__limit {
    max-width: rem(200);
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
table {
  margin-bottom: rem(20);
  width: 100%;
  border-collapse: collapse;
}
thead {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
tbody {
  background: lightgray;
}
th {
  padding: rem(10) 0;
  font-size: rem(20);
}
td {
  padding: rem(10) 0 rem(10);
  text-align: center;
}
tr:hover {
  background: gray;
}
tr:hover .table__reward, tr:hover .table__convert {
  color: lightgray;
}
</style>