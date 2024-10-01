import React from 'react'
import Countdown from '../components/CountDown'
import Header from '../components/Header'
import { Container } from '@mui/material'

export default function HomePage() {
  return (
    <div>
      <Header/>
      <Container>
      <div style={{marginTop:"100px"}}><Countdown/></div>
      </Container>
    </div>
  )
}
