import { Brightness5, BrightnessMedium, DarkMode } from "@mui/icons-material";
import { Box, IconButton, Menu, Stack, ToggleButton, ToggleButtonGroup, Typography, useColorScheme } from "@mui/material";
import { useState } from "react";

export default function ModeToggle() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }

    const handleThemeChange = (
        _event: React.MouseEvent<HTMLElement>,
        mode: "light" | "dark" | "system",
    ) => {
        setMode(mode);
        setAnchorEl(null);
    };


    return (
        <>
            <IconButton
                id='color-theme-button'
                aria-label='open color theme menu'
                aria-controls={open ? 'color-theme-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {mode === 'light' && (
                    <Brightness5 />
                )}
                {mode === 'dark' && (
                    <DarkMode />
                )}
                {mode === 'system' && (
                    <BrightnessMedium />
                )}
            </IconButton>
            <Menu
                id='color-theme-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'color-theme-button'
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box py={1} px={2}>
                    <Typography variant='body2' mb={1}>Mode</Typography>
                    <Stack direction='row' spacing={4}>
                        <ToggleButtonGroup
                            value={mode}
                            exclusive
                            onChange={handleThemeChange}
                            aria-label='color theme'
                        >
                            <ToggleButton value='light' size='small' sx={{ gap: 1, fontSize: '0.75em' }}>
                                <Brightness5 fontSize="small" />
                                Light
                            </ToggleButton>
                            <ToggleButton value='dark' size='small' sx={{ gap: 1, fontSize: '0.75em' }}>
                                <DarkMode fontSize="small" />
                                Dark
                            </ToggleButton>
                            <ToggleButton value='system' size='small' sx={{ gap: 1, fontSize: '0.75em' }}>
                                <BrightnessMedium fontSize="small" />
                                System
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Box>
            </Menu>
        </>
    )
}
