'use client'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from '../background';
// import { poppins } from '../font';
// import { amaticSc } from '../font';
import AnimatedComponent from '../animatedComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import * as React from 'react'
import ApiClient from '../apiClient'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useRouter } from 'next/navigation'


function Copyright() {
    return (
        <Grid container item position={'fixed'} bottom={'2%'} left={'5%'} xs={12} sx={{
            backgroundColor: '#1e3240',
            padding: '1rem',
            borderRadius: '0.5rem',
          }} >
            <Typography  variant='body2' color='#FFF' align='center'>
                {'Created by Kukuh from Develover.'}
            </Typography>
        </Grid>
    )
}

export default function Page() {
    const router = useRouter()
    const [nama,setNama] = React.useState()
    const [pesan,setPesan] = React.useState()
    const [msgOpen,setMsgOpen] = React.useState()
    const [openDialog,setOpenDialog] = React.useState(false)

    const defaultTheme = createTheme({
    typography: {
        fontFamily: ['Poppins', 'Amatic SC', 'sans-serif'].join(','),
        body1: {
            color: '#FFF'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#FFF',
                        },
                        '& .MuiInput-underline:after': {
                        borderBottomColor: '#FFF',
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFF',
                        },
                        '&:hover fieldset': {
                            borderColor: '#FFF',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FFF',
                        },
                        '& input': {
                            color: '#FFF',
                        },
                        },
                        '& .input': {
                        color: '#FFF',
                    },
                    }
                }
            }
        }
    });

    const handleGenerate = async (event) => {
        event.preventDefault()
        const param = {penerima:nama,pesan:pesan}
        // console.log(param)
        await sendData(param)
    }

    const handleInputChange = (event,set) => {
        set(event)
    }

    const sendData = async (param) => {
        try{
          const retVal = await ApiClient.callPost('/generate/',param)
          setMsgOpen('Sedang Membuat')
          setOpenDialog(true)
          let path = retVal.path
        //   path = path.replace('.png','')
        //   path = path.replace('/','')
        // console.log(path)
          setTimeout(() => {
            router.push('/buatkamu?id='+path)
          }, 700);
        }catch(error){
          setMsgOpen('Terjadi Kesalahan')
          setOpenDialog(true)
        //   console.log(error)
        }
    }

    return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container component='main' maxWidth='sm' sx={{ mb: 6 }}> 
        <Background />
        <Grid sx={{ my: { xs: 6, md: 6 }, p: { xs: 3, md: 3 } }} padding={4}>
            <Grid alignItems='center' item xs={6} marginBottom={8}>
            <Typography sx={{ fontFamily: 'Amatic SC'}} variant='h3' align='center'>
                {'Kamu mau kirim ini buat siapa?'}
            </Typography>
            </Grid>
            <Grid alignItems='center' item xs={12} marginBottom={4}>
            <AnimatedComponent element='div' alignItems='center'>
                <TextField required label='Nama' fullWidth={true} sx={{fontFamily:'Poppins'}} inputProps={{maxLength:50}}
                onChange={e => handleInputChange(e.target.value,setNama)}
                value={nama}/>
            </AnimatedComponent>
            </Grid>
            <Grid alignItems='center' item xs={12} marginBottom={4}>
            <AnimatedComponent element='div' alignItems='center' delay={2}>
                <TextField required label='Pesan' fullWidth={true} sx={{fontFamily:'Poppins'}} multiline 
                inputProps={{ maxLength: 300, style:{color:'#FFF'}}} 
                rows={5} helperText='Max 300 Character ya, Enter kalo gacukup'
                onChange={e => handleInputChange(e.target.value,setPesan)}
                value={pesan}/>
            </AnimatedComponent>
            </Grid>
            <Grid alignItems='center' justifyContent='center' item xs={12} marginBottom={4}>
            <AnimatedComponent element='div' alignItems='center' delay={4}>
                <Button
                    onClick={handleGenerate}
                    color='inherit'
                    fullWidth={true}
                >
                    <Typography sx={{ fontFamily: 'Amatic SC'}} variant='h5' align='center'>
                        Create QR-Code
                    </Typography> 
                </Button>
            </AnimatedComponent>
            </Grid>
        </Grid>
        </Container>
        <Dialog open={openDialog} onClose={() => {
          setOpenDialog(true)
        }
        }>
            <DialogContent>
            <h5>{msgOpen}</h5>
            </DialogContent>
        </Dialog>
        {Copyright()}
    </ThemeProvider>
    );
}