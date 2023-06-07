import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Divider,
  Card,
  Tooltip,
  Link,
} from "@mui/material";

import EditModal from "./editModal/EditModal";

import { tokens } from "../../../global/theme/Theme";
import { getItem } from "../../../core/services/storage/Storage";

import EditIcon from "@mui/icons-material/Edit";

const EmployeeProfileInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [employeeInfo, setEmployeeInfo] = React.useState(
    JSON.parse(getItem("employee"))
  );
  return (
    <Box
      sx={{
        height: "109%",
      }}
    >
      <Card
        sx={{
          height: "100%",
          backgroundColor: theme.palette.mode === "dark" && colors.primary[400],
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
        >
          <Typography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            profile information
          </Typography>
          <Typography component={Link} variant="body2" color="secondary">
            <Tooltip title="edit" placement="top">
              <EditIcon
                sx={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => {
                  setOpenEditModal(true);
                }}
              />
            </Tooltip>
          </Typography>
        </Box>
        <Box p={2}>
          <Box mb={2} lineHeight={1}>
            <Typography variant="button" color="text" fontWeight="regular">
              Hi, I'm {employeeInfo.fullName}, Decisions: If you can't decide,
              the answer is no. If two equally difficult paths, choose the one
              more painful in the short term (pain avoidance is creating an
              illusion of equality).
            </Typography>
          </Box>
          <Box opacity={0.3}>
            <Divider />
          </Box>
          <Box>
            <Box display="flex" py={1} pr={2}>
              <Typography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Full Name: &nbsp;
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{employeeInfo.fullName}
              </Typography>
            </Box>

            <Box display="flex" py={1} pr={2}>
              <Typography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Mobile:&nbsp;
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{employeeInfo.phoneNumber}
              </Typography>
            </Box>

            <Box display="flex" py={1} pr={2}>
              <Typography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Email: &nbsp;
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{employeeInfo.email}
              </Typography>
            </Box>

            <Box display="flex" py={1} pr={2}>
              <Typography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Location:&nbsp;
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{employeeInfo.address}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
      {openEditModal && (
        <EditModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      )}
    </Box>
  );
};

export default React.memo(EmployeeProfileInfo);
