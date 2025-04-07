<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    <h3>今日设备运行状态</h3>
                    <!-- 动态显示时间 -->
                    <p id="updateTime" class="ml">更新时间: {{ formattedTime }}</p>
                    <!-- 点击刷新图标更新时间 -->
                    <el-icon color="#86909c" style="margin-left: 5px; cursor: pointer;" @click="updateCurrentTime">
                        <Refresh />
                    </el-icon>
                </div>  
                <div class="equipment">
                    <div class="item">
                        <h4>充电桩使用率</h4>
                        <img :src="flash" alt="" class="mb mt">
                        <h1>72 / 95</h1>
                        <div class="statistic-card">
                            <el-statistic :value="9">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark"
                                            content="Number of users who logged into the product in one day"
                                            placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4>充电柜使用率</h4>
                        <img :src="flash2" alt="" class="mb mt">
                        <h1>655 / 1233</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark"
                                            content="Number of users who logged into the product in one day"
                                            placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="red">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4>充电站使用率</h4>
                        <img :src="flash3" alt="" class="mb mt">

                        <h1>2263 / 3398</h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark"
                                            content="Number of users who logged into the product in one day"
                                            placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>常用功能</h1>
                    </div>
                </template>
                <div class="quick mt mb">
                    <div :span="4">
                        <img :src="repair">
                        <p>设备维修</p>
                    </div>
                    <div :span="4">
                        <img :src="daily">
                        <p>每日日报</p>
                    </div>
                    <div :span="4">
                        <img :src="progress">
                        <p>任务进度</p>
                    </div>
                    <div :span="4">
                        <img :src="total">
                        <p>营收占比</p>
                    </div>
                    <div :span="4">
                        <img :src="money">
                        <p>营收统计</p>
                    </div>
                    <div :span="4">
                        <img :src="remain">
                        <p>待办事项</p>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>能源统计</h1>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div ref="chartRef2" style="width: 100%; height: 400px;margin-top: -40px"></div>
                    </el-col>
                    <el-col :span="18">
                        <div ref="chartRef" style="width: 100%; height: 400px;"></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h1>设备总览</h1>
                    </div>
                </template>
                <div ref="chartRef3" style="width: 100%;height: 240px;"></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>营收统计表</h1>
                    </div>
                </template>
                <ul class="ranking-list">
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(103, 194, 58);color: #fff ;">1</span>
                        <span class="store-name">广州</span>

                        <span class="sales">52,457</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(64, 158, 255) ;color: #fff ;">2</span>
                        <span class="store-name">上海</span>
                        <span class="sales">323,234</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color:rgb(230, 162, 60) ;color: #fff ;">3</span>
                        <span class="store-name">佛山</span>
                        <span class="sales">192,255</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">4</span>
                        <span class="store-name">珠海</span>
                        <span class="sales">17,540</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">5</span>
                        <span class="store-name">深圳</span>
                        <span class="sales">662,337</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">6</span>
                        <span class="store-name">厦门</span>
                        <span class="sales">22,941</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">7</span>
                        <span class="store-name">长沙</span>
                        <span class="sales">565,221</span>
                        <span style="margin-left: 12px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                </ul>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>故障报警</h1>
                    </div>
                </template>
                <el-timeline style="max-width: 600px">
                    <el-timeline-item timestamp="2018/4/12" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>矿业北路通讯中断</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top" :hollow="true" type="warning">
                        <el-card>
                            <h4>黄河南路超出服务区域</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>6号机组异常断电</h4>

                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"
import { ref, reactive,computed } from "vue"
import { useChart } from '@/hooks/useChart'
import { ElMessage } from 'element-plus';
import { chartDataApi, chartDataApi2, chartDataApi3 } from "@/api/dashboard"
const chartRef = ref(null)
const chartRef2 = ref(null)
const chartRef3 = ref(null)
// 定义当前时间的响应式变量
const currentTime = ref(new Date());

// 格式化时间为 yyyy年MM月dd日
const formattedTime = computed(() => {
  const year = currentTime.value.getFullYear();
  const month = String(currentTime.value.getMonth() + 1).padStart(2, '0');
  const day = String(currentTime.value.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
});

// 更新当前时间的方法
function updateCurrentTime() {
  currentTime.value = new Date(); // 更新为当前时间

  // 显示提示消息
  ElMessage({
    message: '时间已更新成功！',
    type: 'success', // 提示类型：success（绿色）
    duration: 1000, // 持续时间：2秒
  });
}
const setChartData = async () => {
    const chartOptions: any = reactive({
        title: {
            text: '电量统计',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}kw'
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "purple",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "lightgreen",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "skyblue",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },

        ]
    })
    const res = await chartDataApi()
    chartOptions.legend.data = res.data.list.map((item: any) => item.name)
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
}
const setChartData2 = async () => {
    const chartOptions = reactive({
        legend: {
            top: 'bottom',

        },

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} %'
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                radius: ['50%', '70%'], // 内外半径形成环形
                center: ['50%', '50%'],
                roseType: 'area',
                color: ['#4B6EBD', '#3DBB92', '#53C1D6'], // 颜色
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                data: []
            }
        ],
        graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
                text: '营收占比',
                textAlign: 'center',
                textVerticalAlign: 'middle',
                fontSize: 20,
                fill: '#333'
            }
        }
    });
    const res = await chartDataApi2();
    chartOptions.series[0].data = res.data.list
    return chartOptions
}
const setChartData3 = async () => {
    const chartOptions = reactive({
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '闲置数', max: 65 },
                { name: '使用数', max: 160 },
                { name: '故障数', max: 300 },
                { name: '维修数', max: 380 },
                { name: '更换数', max: 520 },
                { name: '报废数', max: 250 }
            ]
        },
        series: [
            {
                name: '设备总览',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: '设备总览'
                    },

                ]
            }
        ]
    });
    const res = await chartDataApi3();
    chartOptions.series[0].data[0].value = res.data.list
    return chartOptions
}
useChart(chartRef, setChartData)
useChart(chartRef2, setChartData2)
useChart(chartRef3, setChartData3)
</script>
<style lang="less" scoped>
.title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    align-items: flex-end;
    margin-bottom: 20px;

    p {
        color: #86909c;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .item {
        h1 {
            font-size: 36px;
        }

        :deep(.el-statistic__content) {
            margin-top: 10px !important;
            margin-bottom: 10px;
        }

    }
}

.quick {
    padding: 0 40px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    p {
        margin-top: 10px;
        color: #333;
    }
}

.ranking-list {
    list-style-type: none;
    padding: 0;
}

.ranking-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;
}

.ranking-item:nth-child(even) {
    background-color: rgb(253, 246, 236);
    /* 交替背景色 */
}


.rank {
    font-weight: bold;
    color: #666;
    display: inline-block;
    width: 30px;
    height: 30px;

    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    /* 排名颜色 */
}

.store-name {
    flex-grow: 1;
    padding: 0 10px;
}

.sales {
    color: #666;
    /* 销售额颜色 */
}
</style>