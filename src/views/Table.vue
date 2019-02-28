<template>
  <div>
    <h2 v-text="msg"></h2>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <el-input v-model.number="input[scope.$index]" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="总价">
        <template slot-scope="scope">
          {{ input[scope.$index] * scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Data Table',
      input: Array(4).fill(0),
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        price: 20,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '赵大虎',
        price: 30,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '潘老虎',
        price: 40,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '李死虎',
        price: 10,
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
