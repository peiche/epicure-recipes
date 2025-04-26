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
            <Typography variant='body2' mt={1} fontStyle='italic' sx={(theme) => ({
                color: theme.vars.palette.text.disabled,
            })}>
                There are no refinements available.
            </Typography>
        )
    }

    return (
        <>
            {items.map((item, index) => (
                <FormControl key={index} fullWidth>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                            />
                        }
                        label={
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <Typography component='span'>{item.label}</Typography>
                                <Chip label={item.count} size='small' variant='outlined' />
                            </Box>
                        }
                    />
                </FormControl>
            ))}

            {canToggleShowMore && (
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
            )}
        </>
    )
};
