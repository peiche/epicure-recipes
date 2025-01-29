import { graphql, HeadFC, Link as GatsbyLink } from "gatsby";
import * as React from "react"
import Layout from "../components/layout";
import { Box, Chip, Container, Grid2 as Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { AccessTimeOutlined, PrintOutlined, RestaurantOutlined } from "@mui/icons-material";
import { Recipe } from "../interfaces/Recipe";

interface RecipeTemplateProps {
    data: {
        recipesJson: Recipe;
    };
}

const RecipePrintTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
    const {
        name,
        slug,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        tags,
        tips,
        perfectlyBalanceYourPlate,
        nutritionalInformation,
    } = data.recipesJson;

    React.useEffect(() => {
        window.print();
    }, []);

    return (
        <Layout>
            <Container maxWidth='md' sx={{ my: 3 }}>
                <Typography component='h1' variant='h4' sx={{ my: 2 }}>{name}</Typography>

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

                {description && (
                    <Typography my={2}>{description}</Typography>
                )}

                <Grid container spacing={2} my={2}>
                    {ingredients && ingredients.length > 0 && (
                        <Grid size={{
                            xs: 12,
                            md: 6,
                        }}>
                            <Typography component='h2' variant='h5' mb={1}>Ingredients</Typography>
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
                            <Typography component='h2' variant="h5" mb={1}>Preparation</Typography>
                            <List disablePadding component='ol' sx={{
                                listStyle: 'auto',
                                marginLeft: 3,
                            }}>
                                {preparation.map((prep, index) => (
                                    <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                        <ListItemText>{prep}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    )}
                </Grid>

                {nutritionalInformation && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Nutritional Information</Typography>
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
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Tips</Typography>
                        {tips.map((tip, index) => (
                            <Typography key={index}>{tip}</Typography>
                        ))}
                    </>
                )}

                {perfectlyBalanceYourPlate && (
                    <>
                        <Typography component='h2' variant="h5" mt={2} mb={1}>Perfectly Balance Your Plate</Typography>
                        <Typography>{perfectlyBalanceYourPlate}</Typography>
                    </>
                )}
            </Container>
        </Layout>
    )
}

export default RecipePrintTemplate

export const Head: HeadFC = () => <title>Epicure Recipes</title>

export const query = graphql`
  query ($slug: String) {
    recipesJson(slug: {eq: $slug}) {
      name
      slug
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
`
