import { graphql, HeadFC, Link as GatsbyLink } from "gatsby";
import * as React from "react"
import Layout from "../components/layout";
import { Box, Breadcrumbs, Button, Chip, Grid2 as Grid, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import { AccessTimeOutlined, PrintOutlined, RestaurantOutlined } from "@mui/icons-material";
import { Recipe } from "../interfaces/Recipe";
import Wrapper from "../components/wrapper";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface RecipeTemplateProps {
    data: {
        recipesJson: Recipe;
    };
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
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
        imagePath,
    } = data.recipesJson;

    const image = imagePath && getImage(imagePath);

    return (
        <Layout>
            <Wrapper>

                <Breadcrumbs>
                    <Link underline='hover' color='inherit' component={GatsbyLink} to='/'>Recipes</Link>
                    <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
                </Breadcrumbs>

                <Box sx={{ my: 2 }}>
                    {image !== undefined && (
                        <GatsbyImage image={image} alt='' />
                    )}
                    <Typography component='h1' variant='h4' mt={1}>{name}</Typography>
                </Box>

                {tags?.length > 0 && (
                    <Box my={1}>
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
                    mt: 1,
                    mb: 2,
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
                        component={GatsbyLink}
                        to={`/recipe/${slug}/print`}
                        onClick={(event) => {
                            event.preventDefault();
                            window.open(`/recipe/${slug}/print`);
                            return false;
                        }}
                    >Print</Button>
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
            </Wrapper>
        </Layout>
    )
}

export default RecipeTemplate

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
      imagePath {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: AUTO, layout: FULL_WIDTH)
        }
      }
    }
  }
`
