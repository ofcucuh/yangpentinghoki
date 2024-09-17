'use client'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Background from '../background'
import { useRouter } from 'next/navigation'
import { Instagram } from '@mui/icons-material'
import Link from 'next/link'

const defaultTheme = createTheme({
  typography: {
    fontFamily: ['Exo', 'Amatic SC', 'sans-serif'].join(','),
    body1: {
      color: '#FFF',
    },
  },
  a: {
    color: '#FFF'
  }
});

export default function About() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [albumDialog, setAlbumDialog] = React.useState(false)
  const [nama,setNama] = React.useState('')
  const [pesan,setPesan] = React.useState('')
  const router = useRouter()
  
  const handleKembali = () => {
    router.push('/')
  }
  const handleOther = (param) => {
    router.push('https://instagram.com/'+param)
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 6}}>
        <Background />
        <Grid sx={{ my: { xs: 6, md: 6 }, p: { xs: 3, md: 3 } }} padding={2}>
          <Grid alignItems='center' item xs={6} marginBottom={4}>
          <Typography sx={{ fontFamily: 'Exo'}} component='h1' variant='h4' align='center'>
            {'We Are Develover'}
          </Typography>
          <Typography sx={{ fontFamily: 'Exo'}} component='h1' variant='h6' align='center'>
            {'We Develop With Love'}
          </Typography>
          <Typography sx={{ fontFamily: 'Exo'}} component='h1' marginTop={4} align='justify'>
            Hi, This is Kukuh from Develover.<br />
            Permainan tuh ada kalah dan menang, tapi pernah gasi menang kalah kamutuh ditentukan oleh hoki?<br/>
            Maka dari itulah permainan ini dibuat, selain karena lucu ketika diadu, ini juga seru<br/>
            Project ini merupakan cerdas cermat dengan sedikit ide menarik didalamnya, Happy Play<br/>
            <br/><br/>
            Contributor pertanyaan:<br/>
              <Button onClick={() => handleOther('pinaygnn')}
                color='inherit'
                startIcon={<Instagram />}>
                    Pinaya
                </Button> <br/>
              <Button onClick={() => handleOther('apawcadoo')}
              color='inherit'
              // fullWidth
              startIcon={<Instagram />}>
                  Kartini
              </Button> <br/>
              <Button onClick={() => handleOther('aldhnrr')}
                color='inherit'
                // fullWidth/
                startIcon={<Instagram />}>
                    Aldhi
                </Button> <br/>
              <Button onClick={() => handleOther('localhost_18')}
                color='inherit'
                // fullWidth/
                startIcon={<Instagram />}>
                    Fintan
                </Button> <br/>
          </Typography>
          <Typography sx={{fontFamily: 'Exo'}} marginTop={3} align='center'>
          Dibuat dengan sepenuh hati
          </Typography>
          </Grid>
          <Grid item xs={12} container spacing={4}>
            <Grid item xs={6}>
                <Button onClick={handleKembali}
                color='inherit'
                fullWidth>
                    Back
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => handleOther('allow_or_cancel')}
                color='inherit'
                fullWidth
                startIcon={<Instagram />}>
                    Instagram
                </Button>
            </Grid>
          </Grid>
        <Dialog open={openDialog} onClose={() => {
          setOpenDialog(false)
        }
        }>
            <DialogContent>
            <h4>{message}</h4>
            </DialogContent>
        </Dialog>
      </Grid>
      </Container>
    </ThemeProvider>
  )
}