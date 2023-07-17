import { Box, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useMemo, useId } from "react";
import URLBASE from "../constant/urlbase";
import { useNavigate} from "react-router-dom";

const Sent = ({ gift }) => {
  const uniqueId = useId;
  const navigate = useNavigate();
  const memoizedSend = useMemo(() => gift, [gift]);
  return (
    <Box mb={5}>
      <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
        {memoizedSend?.length > 0 ? (
          <>
            {memoizedSend.map((gift, index) => {
              return (
                <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
                  <Box sx={{ boxShadow: "2" }}>
                    <CardMedia
                      onClick={()=> navigate(`/home/item/${gift?.id}`)}
                      component="img"
                      fit="cover"
                      image={`${URLBASE.imageBaseUrl}${gift?.item_pics}`}
                      alt={gift?.item_name}
                      sx={{ padding: "0.5em" }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" sx={{ fontSize: "12px" }}>
                        {gift?.item_name}
                      </Typography>
                      {/* <Avatar
                    variant="circle"
                    alt="GT"
                    src={`${URLBASE.imageBaseUrl}${gift?.profilePic}`}
                    sx={{ width: "62", height: "62" }}
                    onClick={()=> handleGoProfile(gift?.userId)}
                  /> */}
                    </CardContent>
                  </Box>
                </Grid>
              );
            })}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="medium"
              textAlign="center"
              marginTop="5"
            >
              Nothing Yet!
            </Typography>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Sent;
