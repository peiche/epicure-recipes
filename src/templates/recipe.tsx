import { graphql, HeadFC, Link as GatsbyLink } from "gatsby";
import * as React from "react"
import Layout from "../components/layout";
import { extractListItems, splitParagraphs, stripHtmlTags } from "../utils/tools";
import { Box, Breadcrumbs, Button, Chip, Grid2 as Grid, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import { AccessTimeOutlined, PrintOutlined, RestaurantOutlined } from "@mui/icons-material";
import { RecipeJson } from "../interfaces/RecipeJson";

interface RecipeTemplateProps {
    data: {
        allDataJson: {
            nodes: RecipeJson[];
        };
    };
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
    const {
        name,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        tags,
        tips,
        perfectlyBalanceYourPlate,
        nutritionalInformation,
    } = data.allDataJson.nodes[0];

    const preparationArr: string[] = extractListItems(preparation);
    const tipsArr: string[] = splitParagraphs(tips);

    const handlePrintClick = () => {
        window.print();
    };

    return (
        <Layout>

            <Breadcrumbs className="hide-print">
                <Link underline='hover' color='inherit' component={GatsbyLink} to='/'>Recipes</Link>
                <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
            </Breadcrumbs>

            <Typography component='h1' variant='h4' sx={{ my: 1 }}>{name}</Typography>

            {tags?.length > 0 && (
                <Box my={1} className='hide-print'>
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            variant='outlined'
                            size='small'
                            label={tag.name}
                            component={GatsbyLink}
                            to={`/tag/${tag.slug}`}
                            sx={{
                                mr: 1,
                                mb: 1,
                                cursor: 'pointer',
                            }} />
                    ))}
                </Box>
            )}

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 3,
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                }}>
                    {totalTime && (
                        <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeOutlined />
                            {totalTime}
                        </Typography>
                    )}

                    {servings && (
                        <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <RestaurantOutlined />
                            {servings}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant='contained'
                    disableElevation
                    startIcon={<PrintOutlined />}
                    onClick={handlePrintClick}
                    className="hide-print"
                >Print</Button>
            </Box>

            {description && (
                <Typography mb={1}>{stripHtmlTags(description)}</Typography>
            )}

            <Grid container spacing={{
                xs: 0,
                md: 3,
            }}>
                {ingredients && ingredients.length > 0 && (
                    <Grid size={{
                        xs: 12,
                        md: 6,
                    }}>
                        <Typography component='h2' variant='h5' mt={3} mb={1}>Ingredients</Typography>
                        <List disablePadding>
                            {ingredients.map((ingredient, index) => (
                                <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                    <ListItemText>
                                        <span dangerouslySetInnerHTML={{ __html: ingredient.quantity }} />{` `}
                                        {ingredient.name}{ingredient.additionalInstruction && `, ${ingredient.additionalInstruction}`}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )}

                {preparation && (
                    <Grid size={{
                        xs: 12,
                        md: 6,
                    }}>
                        <Typography component='h2' variant="h5" mt={3} mb={1}>Preparation</Typography>
                        <List disablePadding component='ol' sx={{
                            listStyle: 'auto',
                            marginLeft: 3,
                        }}>
                            {preparationArr.map((prep, index) => (
                                <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                    <ListItemText>{stripHtmlTags(prep)}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )}
            </Grid>

            {nutritionalInformation && (
                <>
                    <Typography component='h2' variant="h5" mt={3} mb={1}>Nutritional Information</Typography>
                    <Typography>
                        Per serving{nutritionalInformation.servingSize && (
                            `(${nutritionalInformation.servingSize})`
                        )}:{` `}
                        Calories {nutritionalInformation.calories},{` `}
                        Fat {nutritionalInformation.fat} g (Saturated {nutritionalInformation.saturatedFat} g, {nutritionalInformation.transFat} 0 g),{` `}
                        Cholesterol {nutritionalInformation.cholesterol} mg,{` `}
                        Sodium {nutritionalInformation.sodium} mg,{` `}
                        Carbohydrate {nutritionalInformation.carbohydrate} g (Fiber {nutritionalInformation.fiber} g, Sugars {nutritionalInformation.sugars} g),{` `}
                        Protein {nutritionalInformation.protein} g.
                    </Typography>
                </>
            )}

            {tips && (
                <>
                    <Typography component='h2' variant="h5" mt={3} mb={1}>Tips</Typography>
                    {tipsArr.map((tip, index) => (
                        <Typography key={index}>{stripHtmlTags(tip)}</Typography>
                    ))}
                </>
            )}

            {perfectlyBalanceYourPlate && (
                <>
                    <Typography component='h2' variant="h5" mt={3} mb={1}>Perfectly Balance Your Plate</Typography>
                    <Typography>{stripHtmlTags(perfectlyBalanceYourPlate)}</Typography>
                </>
            )}
        </Layout>
    )
}

export default RecipeTemplate

export const Head: HeadFC = () => <title>Epicure Recipes</title>

export const query = graphql`
  query ($slug: String) {
    allDataJson(filter: {slug: {eq: $slug}}) {
      nodes {
        name
        totalTime
        servings
        description
        ingredients {
          name
          quantity
          additionalInstruction
        }
        preparation
        tags {
          slug
          name
        }
        tips
        perfectlyBalanceYourPlate
        nutritionalInformation {
        calories
          carbohydrate
          cholesterol
          fat
          fiber
          protein
          saturatedFat
          servingSize
          sodium
          sugars
          transFat
        }
      }
    }
  }
`
