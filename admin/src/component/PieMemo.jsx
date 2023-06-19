import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { allgiftcount } from "../context/features/giftSlice";
import { useSelector, useDispatch } from "react-redux";

const COLORS = ["#642c8e", "#d676af"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieMemo() {
  
  const dispatch = useDispatch();
   const [costGroups, setCostGroups] = useState([]);
  const { allGiftCount } = useSelector((state) => ({
    ...state.gift,
  }));
  const memoizedGift = useMemo(() => allGiftCount, [allGiftCount]);
  useEffect(() => {
    dispatch(allgiftcount());
  }, [dispatch]);

  useEffect(() => {
    setCostGroups([
      { name: "Redeemed", qty: memoizedGift?.RedeemedGift },
      { name: "Pending", qty: memoizedGift?.PendingGift},
    ]);
  }, [memoizedGift]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#642c8e"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h5" sx={{fontFamily:"Poppins"}}>Gift Statistics</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
