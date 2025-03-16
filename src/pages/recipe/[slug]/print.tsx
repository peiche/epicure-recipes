import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import { useEffect } from 'react';
import { Recipe } from '../../../interfaces/Recipe';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../../../components/seo';
import { Typography } from '@progress/kendo-react-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';

interface RecipePrintPageProps {
    recipe: Recipe;
}

export default function RecipePrintPage({ recipe }: RecipePrintPageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        nutritionalInformation,
        tips,
        perfectlyBalanceYourPlate,
    } = recipe;

    useEffect(() => {
        window.print();
    }, []);

    return (
        <Layout>
            <SEO title={name} />
            <div className='container container-md k-my-3'>
                <Typography.h1 className='k-h3'>{name}</Typography.h1>

                <div className='k-d-flex k-gap-5 k-align-items-center k-mb-3'>
                    {totalTime && (
                        <Typography.p className='k-d-flex k-gap-1 k-align-items-center !k-mb-0'>
                            <FontAwesomeIcon icon={faClock} />
                            {totalTime}
                        </Typography.p>
                    )}

                    {servings && (
                        <Typography.p className='k-d-flex k-gap-1 k-align-items-center !k-mb-0'>
                            <FontAwesomeIcon icon={faUtensils} />
                            {servings}
                        </Typography.p>
                    )}
                </div>

                {description && (
                    <div>
                        <Typography.p>{description}</Typography.p>
                    </div>
                )}

                <GridLayout
                    className='grid-responsive-2-cols'
                    gap={{
                        cols: 10,
                        rows: 10,
                    }}
                >
                    {ingredients?.length > 0 && (
                        <GridLayoutItem>
                            <Typography.h2 className='k-h4 !k-font-normal'>Ingredients</Typography.h2>
                            <ul className='k-list-none k-mt-0 k-p-0'>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className='k-my-2'>
                                        <span dangerouslySetInnerHTML={{ __html: ingredient.quantity }} />{` `}
                                        {ingredient.name}{ingredient.additionalInstruction && `, ${ingredient.additionalInstruction}`}
                                    </li>
                                ))}
                            </ul>
                        </GridLayoutItem>
                    )}

                    {preparation?.length > 0 && (
                        <GridLayoutItem>
                            <Typography.h2 className='k-h4 !k-font-normal'>Preparation</Typography.h2>
                            <ul className='k-list-none k-mt-0 k-p-0'>
                                {preparation.map((prep, index) => (
                                    <li key={index} className='k-my-2'>
                                        {prep}
                                    </li>
                                ))}
                            </ul>
                        </GridLayoutItem>
                    )}
                </GridLayout>

                {nutritionalInformation && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Nutritional Information</Typography.h2>
                        <Typography.p>
                            Per serving{nutritionalInformation.servingSize && (
                                `(${nutritionalInformation.servingSize})`
                            )}:{` `}
                            Calories {nutritionalInformation.calories},{` `}
                            Fat {nutritionalInformation.fat} g (Saturated {nutritionalInformation.saturatedFat} g, {nutritionalInformation.transFat} 0 g),{` `}
                            Cholesterol {nutritionalInformation.cholesterol} mg,{` `}
                            Sodium {nutritionalInformation.sodium} mg,{` `}
                            Carbohydrate {nutritionalInformation.carbohydrate} g (Fiber {nutritionalInformation.fiber} g, Sugars {nutritionalInformation.sugars} g),{` `}
                            Protein {nutritionalInformation.protein} g.
                        </Typography.p>
                    </div>
                )}

                {tips?.length > 0 && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Tips</Typography.h2>
                        {tips.map((tip, index) => (
                            <Typography.p key={index}>{tip}</Typography.p>
                        ))}
                    </div>
                )}

                {tips?.length > 0 && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Tips</Typography.h2>
                        {tips.map((tip, index) => (
                            <Typography.p key={index}>{tip}</Typography.p>
                        ))}
                    </div>
                )}

                {perfectlyBalanceYourPlate && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Perfectly Balance Your Plate</Typography.h2>
                        <Typography.p>{perfectlyBalanceYourPlate}</Typography.p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipesDirectory = path.join(process.cwd(), 'src', 'data', 'recipes');
    const filenames = fs.readdirSync(recipesDirectory);

    return {
        paths: filenames.map((filename) => ({
            params: {
                slug: filename.replace(/\.json$/, ''),
            },
        })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const recipePath = path.join(process.cwd(), 'src', 'data', 'recipes', `${params?.slug}.json`);
    const content = fs.readFileSync(recipePath, 'utf8');
    const recipe: Recipe = JSON.parse(content);

    return {
        props: {
            recipe,
        },
    };
}