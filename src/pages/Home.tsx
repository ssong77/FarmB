// src/pages/Home.tsx
import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Avatar,
} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import {
  FlightTakeoff,
  Analytics,
  Biotech,
  Assessment,
  CheckCircle,
  TrendingUp,
  Nature,
  Water,
} from '@mui/icons-material'

import Header from '../components/Header'
import droneImage from '../assets/images/drone.jpg'
import reportImage from '../assets/images/report.jpg'

const dummyChartData = [
  { name: '옥수수', 분석결과: 80, 기준치: 60 },
  { name: '벼', 분석결과: 55, 기준치: 50 },
  { name: '콩', 분석결과: 70, 기준치: 65 },
  { name: '밀', 분석결과: 45, 기준치: 40 },
]

const dummyTableRows = [
  { 항목: '수분함량', 값: '18%' },
  { 항목: '질소농도', 값: '0.8g/kg' },
  { 항목: '인산농도', 값: '0.5g/kg' },
  { 항목: '병해발생', 값: '0건' },
  { 항목: '토양 pH', 값: '6.5' },
  { 항목: '유기물함량', 값: '3%' },
  { 항목: '온도', 값: '22°C' },
  { 항목: '습도', 값: '60%' },
]

// 드론 스캔 단계 데이터
const scanSteps = [
  {
    label: '드론 이륙 및 경로 설정',
    description: 'GPS 기반으로 스캔 경로를 자동 설정합니다',
    icon: <FlightTakeoff />,
    duration: '2분'
  },
  {
    label: '고해상도 이미지 촬영',
    description: '4K 카메라로 1m 단위 정밀 촬영을 진행합니다',
    icon: <Biotech />,
    duration: '15분'
  },
  {
    label: 'AI 데이터 분석',
    description: '머신러닝으로 토양 상태를 실시간 분석합니다',
    icon: <Analytics />,
    duration: '3분'
  },
  {
    label: '리포트 생성 완료',
    description: '분석 결과를 시각화하여 즉시 제공합니다',
    icon: <Assessment />,
    duration: '1분'
  }
]

// 샘플 AI 리포트 데이터
const sampleReportData = {
  moisture: [
    { 시간: '06:00', 수분함량: 18 },
    { 시간: '09:00', 수분함량: 22 },
    { 시간: '12:00', 수분함량: 16 },
    { 시간: '15:00', 수분함량: 19 },
    { 시간: '18:00', 수분함량: 21 }
  ],
  nutrients: [
    { name: '질소', value: 65, color: '#8884d8' },
    { name: '인', value: 20, color: '#82ca9d' },
    { name: '칼륨', value: 15, color: '#ffc658' }
  ],
  healthScore: 85
}

export default function Home() {
  // 다이얼로그 열림 상태
  const [openSoilDialog, setOpenSoilDialog] = useState(false)
  const [openAIDialog, setOpenAIDialog] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [tabValue, setTabValue] = useState(0)
  const [scanProgress, setScanProgress] = useState(0)


  const handleOpenSoilDialog = () => {
    setOpenSoilDialog(true)
    // 스캔 시뮬레이션 시작
    setScanProgress(0)
    setActiveStep(0)
    const timer = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 200)
    
    // 단계별 진행
    const stepTimer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepTimer)
          return 3
        }
        return prev + 1
      })
    }, 3000)
  }

  const handleCloseSoilDialog = () => {
    setOpenSoilDialog(false)
    setScanProgress(0)
    setActiveStep(0)
  }
  const handleShowResults = () => {
  setOpenSoilDialog(false)
  setOpenAIDialog(true)
  }

  const handleOpenAIDialog = () => {
    setOpenAIDialog(true)
  }
  const handleCloseAIDialog = () => {
    setOpenAIDialog(false)
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        {/* 히어로 영역 */}
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            FarmBee와 함께하는 스마트 농업
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            드론 기반 실시간 작물·토양 분석과 AI 리포트를 즉시 제공합니다
          </Typography>
        </Container>

        {/* 카드형 기능 블록 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {/* 첫 번째 카드 블록 (고해상도 토양 스캔) */}
            <Box
              sx={{
                width: { xs: '100%', md: 'calc(50% - 16px)' },
                flexGrow: 1,
                minWidth: { xs: 'auto', md: '400px' },
              }}
            >
              <ButtonBase
                onClick={handleOpenSoilDialog}
                sx={{ width: '100%', textAlign: 'left' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={droneImage}
                    alt="토양 스캔"
                    sx={{ height: 240, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">고해상도 토양 스캔</Typography>
                    <Typography variant="body2" color="text.secondary">
                      드론 장비를 이용해 토양 상태를 고해상도로 스캔합니다.
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Box>

            {/* 두 번째 카드 블록 (즉시 생성되는 AI 리포트) */}
            <Box
              sx={{
                width: { xs: '100%', md: 'calc(50% - 16px)' },
                flexGrow: 1,
                minWidth: { xs: 'auto', md: '400px' },
              }}
            >
              <ButtonBase
                onClick={handleOpenAIDialog}
                sx={{ width: '100%', textAlign: 'left' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={reportImage}
                    alt="AI 리포트"
                    sx={{ height: 240, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">즉시 생성되는 AI 리포트</Typography>
                    <Typography variant="body2" color="text.secondary">
                      수집된 데이터를 AI가 정밀 분석해 리포트를 제공합니다.
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Box>
          </Box>
        </Container>

        {/* 분석 예시 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" mb={1}>
            최근 토양 분석 리포트
          </Typography>
          <Typography variant="subtitle1" color="text.primary" mb={3}>
            경기도 용인시 수지구 상현동 농장 — 2025-06-02 분석 결과
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {/* 테이블 블록 */}
            <Box
              sx={{
                width: { xs: '100%', md: 'calc(50% - 16px)' },
                flexGrow: 1,
                minWidth: { xs: 'auto', md: '400px' },
              }}
            >
              <Paper sx={{ p: 2 }}>
                <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                  <Box component="thead">
                    <Box component="tr">
                      <Box
                        component="th"
                        sx={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}
                      >
                        항목
                      </Box>
                      <Box
                        component="th"
                        sx={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}
                      >
                        값
                      </Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {dummyTableRows.map((row) => (
                      <Box component="tr" key={row.항목}>
                        <Box component="td" sx={{ py: 1 }}>
                          {row.항목}
                        </Box>
                        <Box component="td" sx={{ py: 1 }}>
                          {row.값}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* 차트 블록 */}
            <Box
              sx={{
                width: { xs: '100%', md: 'calc(50% - 16px)' },
                flexGrow: 1,
                minWidth: { xs: 'auto', md: '400px' },
              }}
            >
              <Paper sx={{ p: 2 }}>
                <BarChart
                  width={500}
                  height={300}
                  data={dummyChartData}
                  margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="분석결과" fill="#1976d2" />
                  <Bar dataKey="기준치" fill="#8884d8" />
                </BarChart>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="footer" sx={{ textAlign: 'center', p: 2, bgcolor: '#f0f0f0' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 FarmBee. All rights reserved.
        </Typography>
      </Box>

      {/* ─── 고해상도 토양 스캔 정보 다이얼로그 (인터랙티브) ─── */}
      <Dialog open={openSoilDialog} onClose={handleCloseSoilDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <FlightTakeoff />
          </Avatar>
          고해상도 토양 스캔 시연
        </DialogTitle>
        <DialogContent dividers>
          {/* 진행률 표시 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">스캔 진행률</Typography>
              <Typography variant="body2">{scanProgress}%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={scanProgress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          {/* 단계별 진행 과정 */}
          <Stepper activeStep={activeStep} orientation="vertical">
            {scanSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel 
                  icon={
                    <Avatar 
                      sx={{ 
                        bgcolor: index <= activeStep ? 'primary.main' : 'grey.300',
                        width: 32, 
                        height: 32 
                      }}
                    >
                      {step.icon}
                    </Avatar>
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">{step.label}</Typography>
                    <Chip 
                      label={step.duration} 
                      size="small" 
                      color={index <= activeStep ? 'primary' : 'default'}
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  {index === activeStep && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle color="success" fontSize="small" />
                      <Typography variant="body2" color="success.main">
                        진행 중...
                      </Typography>
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {/* 기술 특징 */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              핵심 기술
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip icon={<Water />} label="실시간 수분 매핑" color="primary" />
              <Chip icon={<Nature />} label="영양소 농도 예측" color="success" />
              <Chip icon={<TrendingUp />} label="병해충 위험 분석" color="warning" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSoilDialog} variant="outlined">
            닫기
          </Button>
          <Button 
              variant="contained" 
              disabled={scanProgress < 100}
              onClick={scanProgress >= 100 ? handleShowResults : undefined}
            >
            {scanProgress < 100 ? '스캔 진행 중...' : '결과 보기'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── AI 리포트 정보 다이얼로그 (탭 구조) ─── */}
      <Dialog open={openAIDialog} onClose={handleCloseAIDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <Assessment />
          </Avatar>
          AI 리포트 미리보기
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="대시보드" />
              <Tab label="상세 분석" />
              <Tab label="개선 제안" />
            </Tabs>
          </Box>

          {/* 탭 1: 대시보드 */}
          {tabValue === 0 && (
            <Box>
              {/* 건강도 점수 */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: 'success.50' }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {sampleReportData.healthScore}점
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  토양 건강도 (매우 양호)
                </Typography>
              </Paper>

              {/* 실시간 차트들 */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {/* 수분 함량 트렌드 */}
                <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
                  <Typography variant="h6" gutterBottom>
                    수분 함량 변화
                  </Typography>
                  <LineChart width={350} height={200} data={sampleReportData.moisture}>
                    <XAxis dataKey="시간" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="수분함량" stroke="#1976d2" strokeWidth={3} />
                  </LineChart>
                </Paper>

                {/* 영양소 분포 */}
                <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
                  <Typography variant="h6" gutterBottom>
                    영양소 분포
                  </Typography>
                  <PieChart width={350} height={200}>
                    <Pie
                      data={sampleReportData.nutrients}
                      cx={175}
                      cy={100}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sampleReportData.nutrients.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Paper>
              </Box>
            </Box>
          )}

          {/* 탭 2: 상세 분석 */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                상세 토양 분석 결과
              </Typography>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {dummyTableRows.map((row) => (
                  <Paper key={row.항목} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="medium">
                        {row.항목}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" color="primary.main">
                          {row.값}
                        </Typography>
                        <Chip label="정상" color="success" size="small" />
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {/* 탭 3: 개선 제안 */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                AI 개선 제안사항
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper sx={{ p: 3, border: '1px solid', borderColor: 'info.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <Water />
                    </Avatar>
                    <Typography variant="h6">물 관리</Typography>
                  </Box>
                  <Typography variant="body2">
                    현재 수분 함량이 18%로 적정 수준입니다. 
                    다음 주 강수 예보를 고려하여 2-3일 후 관개를 권장합니다.
                  </Typography>
                </Paper>

                <Paper sx={{ p: 3, border: '1px solid', borderColor: 'success.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Nature />
                    </Avatar>
                    <Typography variant="h6">비료 관리</Typography>
                  </Box>
                  <Typography variant="body2">
                    질소 농도가 최적 범위에 있습니다. 
                    인산 보충을 위해 복합비료 10kg/ha 시비를 권장합니다.
                  </Typography>
                </Paper>

                <Paper sx={{ p: 3, border: '1px solid', borderColor: 'warning.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <TrendingUp />
                    </Avatar>
                    <Typography variant="h6">예방 관리</Typography>
                  </Box>
                  <Typography variant="body2">
                    병해 발생 위험이 낮습니다. 
                    습도가 높아지는 시기에 대비해 예방적 방제를 고려하세요.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAIDialog} variant="outlined">
            닫기
          </Button>
          <Button variant="contained">
            전체 리포트 다운로드
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}