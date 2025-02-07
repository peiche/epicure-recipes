import { Search } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const SearchWrapper = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[500], 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '12ch',
        [theme.breakpoints.up('sm')]: {
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function HeaderSearch() {
    return (
        <SearchWrapper action='/search'>
            <SearchIconWrapper>
                <Search />
            </SearchIconWrapper>
            <StyledInputBase
                name='s'
                placeholder="Search…"
                autoComplete='off'
                inputProps={{ 'aria-label': 'search' }}
            />
        </SearchWrapper>
    )
}