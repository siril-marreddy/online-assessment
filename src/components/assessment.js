import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { chunk } from 'lodash';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import { style } from '@mui/system';

const styles = {
    card: {
        margin: "10px 15px", borderColor: 'red'
    },
    Box: {
        flexGrow: 1, borderRadius: "1px solid red"
    },
    question: {
        textAlign: "left", fontSize: "16px"
    },
    optionContainer: {
        display: "flex", aligItems: "center", marginLeft: "10px"
    },
    option: {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    checkbox: {
        fontSize: "14px", textAlign: 'initial'
    }
}

const Assessment = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(0);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axios.get('./data.json')
            .then(result => {
                // console.log("result", result)
                setData(result?.data?.data?.results)
            })
    }

    const pageNumbers = chunk(data, 5);

    return (
        <div>
            {data && pageNumbers[page].map((item, index) => {
                return (
                    <>
                        <Box sx={style.Box}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={7} >
                                    <Card sx={styles.card}>
                                        <CardContent>
                                            <Typography component="div" style={styles.question} >
                                                {/* <strong>{index + 1}. </strong> */}
                                                {item.question_label}
                                            </Typography>

                                            <div style={styles.optionContainer}>
                                                {item.options.map(option => {
                                                    return (
                                                        <Grid container spacing={1.5}>
                                                            <Grid item xs={4} sx={styles.option}>
                                                                {
                                                                    item.objective_type === "TEXT" ?
                                                                        <>
                                                                            <TextField sx={{ mt: 1.5 }} />
                                                                            <Typography variant='h5'>{option.value}</Typography>
                                                                        </> :
                                                                        item.objective_type === "MULTI SELECT" ?
                                                                            <div style={{ marginLeft: "5px", display: "flex", alignItems: 'center' }}>
                                                                                <Checkbox />
                                                                                <Typography sx={styles.checkbox} variant='body'>{option.value}</Typography>
                                                                            </div>
                                                                            :
                                                                            <div style={{ marginLeft: '-10px', display: 'flex', alignItems: 'center' }}>
                                                                                <Radio />
                                                                                <Typography style={styles.checkbox} variant='h5'>{option.value}</Typography>
                                                                            </div>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                                )
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )
            })
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {pageNumbers.map((number, index) => {
                    return (
                        <div>
                            <Button variant="contained" sx={{ m: 2 }} onClick={() => setPage(index)}>{index + 1}</Button>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Assessment;