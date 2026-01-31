import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Typography } from "@mui/material";
import { RefinementListProps, useRefinementList } from "react-instantsearch";

export default function SearchRefinementList(props: RefinementListProps) {
    const {
        items,
        refine,
        toggleShowMore,
        canToggleShowMore,
        isShowingMore,
    } = useRefinementList(props);

    if (items.length === 0) {
        return (
            <Typography variant='body2' mt={1} fontStyle='italic'>
                There are no refinements available.
            </Typography>
        )
    }

    const refinedItems = items.filter(item => item.isRefined);
    const unrefinedItems = items.filter(item => !item.isRefined);

    return (
        <>
            {refinedItems.map((item, index) => (
                <FormControl key={index} fullWidth>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                                sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }}
                            />
                        }
                        label={<Typography variant="body2">{item.label}</Typography>}
                    />
                </FormControl>
            ))}
            {unrefinedItems.map((item, index) => (
                <FormControl key={index} fullWidth>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                                sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }}
                            />
                        }
                        label={<Typography variant="body2">{item.label}</Typography>}
                    />
                </FormControl>
            ))}

            {canToggleShowMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="text" onClick={toggleShowMore} color='inherit' startIcon={
                        <>
                            {isShowingMore ? (
                                <KeyboardArrowUp />
                            ) : (
                                <KeyboardArrowDown />
                            )}</>
                    } sx={{
                        textTransform: 'none',
                    }}>
                        {isShowingMore ? 'Show less' : 'Show more'}
                    </Button>
                </Box>
            )}
        </>
    )
};
