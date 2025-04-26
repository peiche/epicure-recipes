import { GridView as GridViewIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import View from "../interfaces/View";
import { setView } from "../redux/slices/viewSlice";
import { useAppDispatch } from "../redux/hooks";

interface RecipeListHeaderProps {
    title: string;
    view: View;
}

export default function RecipeListHeader(props: RecipeListHeaderProps) {
    const { title, view } = props;
    const dispatch = useAppDispatch();

    const handleView = (
        _event: React.MouseEvent<HTMLElement>,
        newView: View,
    ) => {
        dispatch(setView(newView));
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography component='h1' variant='h4' mt={1} mb={2}>
                {title}
            </Typography>

            <Box>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleView}
                    aria-label='display view'
                >
                    <ToggleButton value='grid' aria-label='grid view'>
                        <GridViewIcon />
                    </ToggleButton>
                    <ToggleButton value='list' aria-label='list view'>
                        <ViewListIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    )
}
