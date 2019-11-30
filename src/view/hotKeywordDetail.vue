<template>
  <div class="main-wrap">
    <el-form :rules="rules">
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple-left">
            热搜词
            <span class="star">*</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input placeholder="10个字以内" maxlength="10" show-word-limit v-model="word"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple-left">
            排序
            <span class="star">*</span>:
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input v-model="sort"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple-left">
            是否启用
            <span class="star">*</span>:
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-select v-model="enable" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div class="grid-content bg-purple-left">
            备注
            <span class="star">*</span>:
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input type="textarea" :rows="5" placeholder="请输入" v-model="remark"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="6">
          <div class="grid-content bg-purple-left">
            <el-button type="primary" @click="add">保存</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button @click="back">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { addhotWord } from "../service/getData";
export default {
  data() {
    return {
      rules: {
        word: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 10,
            message: "不少于十个字",
            trigger: ["blur", "change"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            message: "内容不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      options: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      word: "",
      sort: "",
      enable: 1,
      remark: ""
    };
  },
  methods: {
    add() {
      if (
        this.word.trim().length != 0 &&
        this.sort.trim().length != 0 &&
        this.remark.trim().length != 0
      ) {
        let params = {
          hotWord: this.word,
          sort: this.sort,
          enable: this.enable,
          remark: this.remark
        };
        addhotWord(params).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success("添加成功");
            (this.word = ""),
              (this.sort = ""),
              (this.enable = 1),
              (this.remark = "");
          } else {
            return;
          }
        });
      } else {
        this.$message.warning("请输入完整信息");
      }
    },
    // gethotWord() {
    //   let params = {
    //     hotWord: this.word,
    //     sort: this.sort,
    //     enable: this.enable,
    //     remark: this.remark
    //   };
    //   addhotWord(params).then(res => {
    //     console.log(res);
    //   });
    // },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  .star {
    color: red;
  }
  .bg-purple-left {
    text-align: right;
    padding-right: 20px;
    line-height: 40px;
  }
  .bg-purple {
    .el-select {
      width: 100%;
    }
  }
  .el-button {
    width: 120px;
    margin-top: 20px;
  }
}
</style>