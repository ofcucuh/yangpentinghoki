'use client'
import ApiClient from '../apiClient'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Background from '../background';
// import {poppins} from '../font'; import {amaticSc} from '../font';
import AnimatedComponent from '../animatedComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Image from 'next/image';
import {useRouter} from 'next/navigation'
import qr from 'qrcode'
import {Paper} from '@mui/material';

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

export default function Page() {
    const router = useRouter()
    const [gridData, setGridData] = React.useState([])

    const getData = async () => {
        try {
            const retVal = await ApiClient.callGet('/generate?all=all')
            // let datas = []
            // retVal.map((value, index) => {
            //     datas[index] = value.value
            // })
            const datas = Object.values(retVal).map((value) => value.value); // Convert the object values to an array
            datas.sort((a, b) => parseInt(b.score) - parseInt(a.score)); // Sort the array based on the "score" property
            const datasWithIndex = datas.map((value, index) => ({ ...value, index })); // Add index property to each element
            // console.log(datas)
            setGridData(datasWithIndex)

            return true
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            await getData()
        }
        fetchData()
    }, [])

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
    });

    const scrollableGridStyles = {
        flexGrow: 1,
        overflow: 'auto', // Make the grid scrollable
        maxHeight: '420px', // Set the maximum height for the grid to enable scrolling
    };

    const itemStyles = {
        padding: '8px',
        textAlign: 'center',
        backgroundColor: '#1e3240'
    };

    const handleBack = () => {
        router.push('/')
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
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
                <Background/>
                <Grid item xs={12} marginTop={'2%'}>
                    <AnimatedComponent element='div' alignItems='center' delay={1}>
                        <Grid alignItems='center' item xs={12}>
                            <Typography
                                sx={{
                                    fontFamily: 'Amatic SC'
                                }}
                                variant='h2'
                                align='center'
                                marginBottom={'10%'}>
                                {'Score Sementara!'}
                            </Typography>
                            <div style={scrollableGridStyles}>
                                <center>
                                    <Grid>
                                        {
                                            gridData.length > 0
                                                ? (gridData.map((item, index) => (
                                                    <AnimatedComponent key={'animated-'+index}
                                                        element='div'
                                                        alignItems='center'
                                                        delay={1 + (index + 1) / 10}>
                                                        <Grid key={index} item xs={10} marginBottom={'1%'}>
                                                            <Paper style={itemStyles}>
                                                                <Typography>{item.nama + ": " + item.score}</Typography>
                                                            </Paper>
                                                        </Grid>
                                                    </AnimatedComponent>
                                                )))
                                                : (
                                                    <Typography
                                                        sx={{
                                                            fontFamily: 'Amatic SC'
                                                        }}
                                                        variant='h5'
                                                        align='center'
                                                        marginBottom={'10%'}>
                                                        {'Sepertinya belum ada yang jawab nih bos'}
                                                    </Typography>
                                                )
                                        }
                                    </Grid>
                                </center>
                            </div>
                        </Grid>
                        <Grid item xs={12} marginTop={'5%'}>
                            <center>
                                <Button color='inherit' onClick={handleBack}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Amatic SC'
                                        }}
                                        variant='h5'
                                        align='center'>
                                        {'Kembali'}
                                    </Typography>
                                </Button>
                            </center>
                        </Grid>
                    </AnimatedComponent>
                </Grid>
            </Grid>
            {Copyright()}
        </ThemeProvider>
    );
}