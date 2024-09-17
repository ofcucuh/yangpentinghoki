'use client'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Background from './background'
import AnimatedComponent from './animatedComponent'
import ApiClient from './apiClient'
import {Dialog, DialogContent, TextField} from '@mui/material'
import {useRouter} from 'next/navigation'
import {v4 as uuid} from 'uuid'

const defaultTheme = createTheme({
    typography: {
        fontFamily: ['Poppins', 'Amatic SC', 'sans-serif', 'Exo'].join(','),
        body1: {
            color: '#FFF'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#FFF'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#FFF'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFF'
                        },
                        '&:hover fieldset': {
                            borderColor: '#FFF'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FFF'
                        },
                        '& input': {
                            color: '#FFF'
                        }
                    },
                    '& .input': {
                        color: '#FFF'
                    }
                }
            }
        }
    }
})

export default function HomeScreen() {

    function Copyright() {
        return (
            <Grid
                container
                item
                position={'fixed'}
                bottom={'2%'}
                left={'5%'}
                xs={12}
                sx={{
                    backgroundColor: '#1e3240',
                    padding: '1rem',
                    borderRadius: '0.5rem'
                }}>
                <Typography variant='body2' color='#FFF' align='center'>
                    {'Created by Develover.'}
                </Typography>
            </Grid>
        )
    }

    function Before() {
        const [text, setText] = React.useState('CERDAS CERMAT?')
        const [openDialogHowTo,setOpenDialogHowTo] = React.useState(false)
        const handleHowTo = () => {
            setOpenDialogHowTo(true)
            // setShowBefore(false)
            // setShowPertanyaan(true)
        }
        const handleMulai = () => {
            setOpenDialogHowTo(false)
            setShowBefore(false)
            setShowPertanyaan(true)
        }
        const handleCekScore = () => {
            router.push('/score')
        }
        const handleAbout = () => {
            router.push('/about')
        }
        React.useEffect(() => {
            const animationSequence = async () => {
                await new Promise((resolve) => setTimeout(resolve, 1300)) // Tunggu selama 1 detik

                setText('')

                await new Promise((resolve) => setTimeout(resolve, 1000)) // Tunggu selama 0.5 detik
                setText('YANG PENTING HOKI!')

                await new Promise((resolve) => setTimeout(resolve, 1500)) // Tunggu selama 2 detik
                setText('Gausah cerdas gausah cermat yang penting hoki!!!')
            }

            animationSequence()
        }, [])

        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    my: {
                        xs: 2,
                        md: 6
                    },
                    p: {
                        xs: 1,
                        md: 3
                    }
                }}>
                <Grid item xs={12} marginTop={'5%'}>
                    <AnimatedComponent element='div'>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins'
                            }}
                            variant='h5'
                            align='center'>
                            {text}
                        </Typography>
                    </AnimatedComponent>
                </Grid>
                <Grid item xs={12} marginTop={'20%'}>
                    <AnimatedComponent element='div' alignItems='center' delay={4}>
                        <Button onClick={handleHowTo} color='inherit' fullWidth={true}>
                            <Typography
                                sx={{
                                    fontFamily: 'Amatic SC'
                                }}
                                variant='h1'
                                align='center'>
                                Mulai
                            </Typography>
                        </Button>
                    </AnimatedComponent>
                </Grid>
                {/* <Grid item xs={12} marginTop={'10%'}>
                    <AnimatedComponent element='div' alignItems='center' delay={4.5}>
                        <Button onClick={handleCekScore} color='inherit' fullWidth={true}>
                            <Typography
                                sx={{
                                    fontFamily: 'Amatic SC'
                                }}
                                variant='h5'
                                align='center'>
                                Cek Score!
                            </Typography>
                        </Button>
                    </AnimatedComponent>
                </Grid> */}
                <Grid item xs={12} marginTop={'10%'}>
                    <AnimatedComponent element='div' alignItems='center' delay={5}>
                        <Button onClick={handleAbout} color='inherit' fullWidth={true}>
                            <Typography
                                sx={{
                                    fontFamily: 'Amatic SC'
                                }}
                                variant='h5'
                                align='center'>
                                About
                            </Typography>
                        </Button>
                    </AnimatedComponent>
                </Grid>
                <Dialog
                    open={openDialogHowTo}
                    onClose={() => {
                        setOpenDialogHowTo(true)
                    }
}>
                    <DialogContent>
                        <Typography sx={{
                                    fontFamily: 'Exo'
                                }}
                                variant='body'
                                align='justify'>
                            Dari 100 Pertanyaan cuma ada 10 yang akan ditampilkan dalam game ini secara acak!<br/>
                            Waktu menjawab 1 pertanyaan adalah 15 detik.<br/>
                            Kamu harus menjawab pertanyaan dengan benar. <br/>
                            Jika jawaban benar, kamu akan dapat poin 1 - 5 secara acak. <br/>
                            Probabilitas poin 1 paling tinggi, sementara poin 5 paling rendah.(semoga kamu hoki) <br/>
                            Pertanyaan bisa saja sama, jadi semoga beruntung ya!.<br/>
                        </Typography>
                        <AnimatedComponent element='div' alignItems='center' delay={2}>
                            <Button onClick={handleMulai} color='inherit' fullWidth={true}>
                                <Typography
                                    sx={{
                                        fontFamily: 'Exo'
                                    }}
                                    variant='h5'
                                    align='center'>
                                    OKE GAS!
                                </Typography>
                            </Button>
                        </AnimatedComponent>
                    </DialogContent>
                </Dialog>
            </Grid>
        )
    }

    const getData = async (param) => {
        try {
            const id = param.id!==null?param.id:null
            const type = param.type!==null?param.type:null
            const all = param.all!==null?param.all:null
            let url = '/generate?'
            if(id){
                url = url + '&id=' + id
            }
            if(type){
                url = url + '&type='+ type
            }
            if(all){
                url = url + '&all=' + all
            }
            const retVal = await ApiClient.callGet(url)
            return retVal
        } catch (error) {
            console.log(error)
        }
    }

    const sendData = async (param) => {
        try {
            const retVal = await ApiClient.callPost('/generate/', param)
            return retVal
        } catch (error) {
            console.log(error)
        }
    }

    function shuffleValues(obj) {
        const values = Object.values(obj)
        const shuffledValues = values.sort(() => Math.random() - 0.5)
        const shuffledObj = {}
        Object
            .keys(obj)
            .forEach((key, index) => {
                shuffledObj[key] = shuffledValues[index]
            })
        return shuffledObj
    }

    function ShowNama() {
        const [nama, setNama] = React.useState('')
        const [msgOpen, setMsgOpen] = React.useState()
        const [openDialog, setOpenDialog] = React.useState(false)

        const handleInputChange = (event, set) => {
            set(event)
        }
        const handleSubmit = async () => {
            // const uid = uuid()
            // const param = {
            //     "nama": nama,
            //     "score": score,
            //     "uid": uid
            // }
            // const hasilAll = await getData({all:"all"})
            // let process = 0
            // hasilAll.every(element => {
            //     const text = element.value.nama.replace('@','')
            //     if(text.toLowerCase() === nama.toLowerCase()){
            //         setOpenDialog(true)
            //         setMsgOpen("@Instagram Sudah Ada")
            //         process = 0
            //         return false
            //     }
            //     process = 1
            //     return true
            // })

            // if(process===1){
                // console.log("masuk")
                // const retVal = await sendData({hasil: param})
                // console.log(retVal)
                setOpenDialog(true)
                setMsgOpen("Skor kamu adalah "+ score)
                // if (retVal) {
                //     // setTimeout(() => {
                //         router.push('/score')
                //     // }, 2000);
                // }
            // }
        }
        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    my: {
                        xs: 2,
                        md: 6
                    },
                    p: {
                        xs: 1,
                        md: 3
                    }
                }}>
                <Grid item xs={12} marginTop={'10%'}>
                    <AnimatedComponent element='div' delay={1}>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins'
                            }}
                            variant='h3'
                            align='center'>
                            {'Game Over!'}
                        </Typography>
                    </AnimatedComponent>
                    <AnimatedComponent element='div' delay={1.5}>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins'
                            }}
                            variant='h6'
                            align='center'
                            marginTop={'5%'}>
                            {'Klik Submit untuk lihat skornya!'}
                        </Typography>
                    </AnimatedComponent>
                </Grid>
                <Grid item xs={12} marginTop={'10%'}>
                    <Grid container alignItems={'center'} justifyContent={'center'}>
                        {/* <Grid item xs={10}>
                            <AnimatedComponent element='div' alignItems='center' delay={2}>
                                <TextField
                                    required
                                    label='@Instagram'
                                    fullWidth={true}
                                    sx={{
                                        fontFamily: 'Poppins'
                                    }}
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    onChange={e => handleInputChange(e.target.value, setNama)}
                                    value={nama}/>
                            </AnimatedComponent>
                        </Grid> */}
                        <Grid item xs={8} marginTop={'5%'}>
                            
                                
                                    <AnimatedComponent element='div' alignItems='center'>
                                        <Button fullWidth={true} color='inherit' onClick={() => handleSubmit()}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Poppins'
                                                }}
                                                align='center'
                                                variant='h6'>
                                                Submit
                                            </Typography>
                                        </Button>
                                    </AnimatedComponent>
                                
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(true)
                    }
                }>
                    <DialogContent>
                        <h5>{msgOpen}</h5>
                        <Button fullWidth onClick={()=>setOpenDialog(false)}>Close</Button>
                    </DialogContent>
                </Dialog>
            </Grid>
        )
    }

    function Countdown() {
        const [time,setTime] = React.useState(15)
        const [msgOpen, setMsgOpen] = React.useState()
        const [openDialog, setOpenDialog] = React.useState(false)

        React.useEffect(() => {
            if(time>0)
            setTimeout(() => {
                setTime(time-1)
            }, 1000)
            if(time === 0){
                setMsgOpen('Waktu menjawab habis!')
                setOpenDialog(true)
                setTimeout(() => {
                    setRound(round + 1)
                }, 2700)
            }
        })

        return(
                <Grid
                // container
                item
                // xs={12}
                sx={{
                    // backgroundColor: '#1e3240',
                    padding: '1rem',
                    borderRadius: '0.5rem'
                }}
                >
                    {/* <Grid item marginBottom={'5%'}> */}
                        Sisa Waktu: {time}
                    {/* </Grid> */}
                    <Dialog
                        open={openDialog}
                        onClose={() => {
                            setOpenDialog(true)
                        }
                    }>
                        <DialogContent>
                            <h5>{msgOpen}</h5>
                        </DialogContent>
                    </Dialog>
                </Grid>
        )
    }

    function Pertanyaan() {
        const [random, setRandom] = React.useState(0)
        const [question, setQuestion] = React.useState('')
        const [options, setOptions] = React.useState([])
        const [msgOpen, setMsgOpen] = React.useState()
        const [openDialog, setOpenDialog] = React.useState(false)
        const [showCountdown,setShowCountdown] = React.useState(true)
        React.useEffect(() => {
            const fetchData = async () => {
                let randomize
                randomize = Math.floor(Math.random() * 50) + 1
                setRandom(randomize)
                // if(cacheRandom!==randomize){
                //     setCacheRandom(randomize)
                // }
                try {
                    const dataQuestion = await getData({id: randomize, type: 'pertanyaan'})
                    const dataOption = await getData({id: randomize, type: 'opsi'})
                    setQuestion(dataQuestion)
                    setOptions(shuffleValues(dataOption))
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
            fetchData()
        }, [round])

        const handleJawab = async (value) => {
            setShowCountdown(false)
            const hasil = await sendData({jawaban: value, id: random})
            let probabilitas1to5 = 0;
            if (hasil) {
                const randomValue = Math.random();
                if (randomValue < 0.5) {
                    probabilitas1to5 = 1;
                } else if (randomValue < 0.6) {
                    probabilitas1to5 = 2;
                } else if (randomValue < 0.8) {
                    probabilitas1to5 = 3;
                } else if (randomValue < 0.9) {
                    probabilitas1to5 = 4;
                } else {
                    probabilitas1to5 = 5;
                }
                setMsgOpen('Selamat Kamu Dapet: ' + probabilitas1to5 + ' Poin')
                setOpenDialog(true)
            } else {
                const jawaban = await getData({id: random,type:'jawaban'})
                // console.log(jawaban)
                setMsgOpen('Sayang sekali jawaban kamu salah! Jawabannya adalah '+jawaban)
                setOpenDialog(true)
            }
            setTimeout(() => {
                setScore(score + probabilitas1to5)
                setRound(round + 1)
            }, 3000);
        }

        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    my: {
                        xs: 2,
                        md: 6
                    },
                    p: {
                        xs: 1,
                        md: 3
                    }
                }}>
                <Grid item xs={12} marginTop={'25%'}>
                    <AnimatedComponent element='div'>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins'
                            }}
                            variant='h5'
                            align='center'>
                            {question && round+1+'. '+question}
                        </Typography>
                    </AnimatedComponent>
                </Grid>
                {options.A !=null && (
                <Grid item xs={12} marginTop={'25%'}>
                    <Grid container item justifyContent={'center'} alignItems={'center'} marginBottom={'10%'}>
                        <AnimatedComponent element={'div'} delay={0}>
                            {showCountdown && <Countdown/>}
                        </AnimatedComponent>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <AnimatedComponent element='div' delay={1}>
                                <Button fullWidth={true} color='inherit' onClick={() => handleJawab(options.A)}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Amatic SC'
                                        }}
                                        align='center'
                                        variant='h5'>
                                        A. {options.A}
                                    </Typography>
                                </Button>
                            </AnimatedComponent>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimatedComponent element='div' delay={1.1}>
                                <Button fullWidth={true} color='inherit' onClick={() => handleJawab(options.B)}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Amatic SC'
                                        }}
                                        align='center'
                                        variant='h5'>
                                        B. {options.B}
                                    </Typography>
                                </Button>
                            </AnimatedComponent>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <AnimatedComponent element='div' delay={1.2}>
                                <Button fullWidth={true} color='inherit' onClick={() => handleJawab(options.C)}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Amatic SC'
                                        }}
                                        align='center'
                                        variant='h5'>
                                        C. {options.C}
                                    </Typography>
                                </Button>
                            </AnimatedComponent>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimatedComponent element='div' delay={1.3}>
                                <Button fullWidth={true} color='inherit' onClick={() => handleJawab(options.D)}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Amatic SC'
                                        }}
                                        align='center'
                                        variant='h5'>
                                        D. {options.D}
                                    </Typography>
                                </Button>
                            </AnimatedComponent>
                        </Grid>
                    </Grid>
                </Grid> ) }
                <Dialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(true)
                    }
                }>
                    <DialogContent>
                        <h5>{msgOpen}</h5>
                    </DialogContent>
                </Dialog>
            </Grid>
        )
    }

    const [showBefore, setShowBefore] = React.useState(true)
    const [showPertanyaan, setShowPertanyaan] = React.useState(false)
    const [round, setRound] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [cacheRandom, setCacheRandom] = React.useState(0)
    const router = useRouter()
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container
                component='main'
                maxWidth='sm'
                sx={{
                    mb: 6
                }}>
                <Background/> 
                {showBefore && <Before/>}
                {showPertanyaan && round < 10 && <Pertanyaan/>}
                {round >= 10 && <ShowNama/>}
            </Container>
            <Copyright/>
        </ThemeProvider>
    )
}