<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    <h3>今日设备运行状态</h3>
                    <p>更新时间：2025年3月30日</p>
                    <el-icon color="#86909c" style="margin-left: 5px;">
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
import { ref, reactive } from "vue"
import { useChart } from '@/hooks/useChart'
import { chartDataApi, chartDataApi2, chartDataApi3 } from "@/api/dashboard"
const chartRef = ref(null)
const chartRef2 = ref(null)
const chartRef3 = ref(null)
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
</style>