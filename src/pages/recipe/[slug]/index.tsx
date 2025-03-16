import fs from 'fs';
import path from 'path';
import Layout from '../../../components/layout';
import Wrapper from '../../../components/wrapper';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../../../interfaces/Recipe';
import SEO from '../../../components/seo';
import { ImageProps } from '../../../interfaces/ImageProps';
import { Typography } from '@progress/kendo-react-common';
import Link from 'next/link';
import { Button } from '@progress/kendo-react-buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import Breadcrumb from '../../../components/breadcrumbs';
import ChipLink from '../../../components/chipLink';

interface RecipePageProps {
    recipe: Recipe;
    image: ImageProps;
}

export default function RecipePage({ recipe, image }: RecipePageProps & InferGetStaticPropsType<typeof getStaticProps>) {
    const {
        name,
        slug,
        tags,
        totalTime,
        servings,
        description,
        ingredients,
        preparation,
        products,
        nutritionalInformation,
        tips,
        perfectlyBalanceYourPlate,
    } = recipe;

    return (
        <Layout>
            <SEO title={name} />
            <Wrapper>

                <Breadcrumb
                    items={[
                        { text: 'Recipes', href: '/recipes' },
                        { text: name },
                    ]}
                />

                <div>
                    {image?.src && (
                        <div className='k-fx'>
                            <Image
                                src={image.src}
                                alt=''
                                width={1036}
                                height={583}
                                priority
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    )}
                    <Typography.h1 className='k-h3'>{name}</Typography.h1>
                </div>

                {tags?.length > 0 && (
                    <div className='k-d-flex k-flex-wrap k-gap-1 k-my-1'>
                        {tags.map((tag, index) => (
                            <ChipLink key={index} name={tag.name} link={`/tag/${tag.slug}`} />
                        ))}
                    </div>
                )}

                <div className='k-d-flex k-justify-content-between k-mb-3'>
                    <div className='k-d-flex k-gap-5 k-align-items-center'>
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

                    <Button
                        themeColor='primary'
                        fillMode='solid'
                        startIcon={<FontAwesomeIcon icon={faPrint} />}
                        onClick={(event) => {
                            event.preventDefault();
                            window.open(`/recipe/${slug}/print`);
                            return false;
                        }}
                    >Print</Button>
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

                {products?.length > 0 && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Epicure Products Used</Typography.h2>
                        <ul className='k-list-none k-mt-0 k-p-0'>
                            {products.map((products, index) => (
                                <li key={index} className='k-my-2'>
                                    <Link className='' href={`/product/${products.slug}`}>{products.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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

                {perfectlyBalanceYourPlate && (
                    <div>
                        <Typography.h2 className='k-h4 !k-font-normal'>Perfectly Balance Your Plate</Typography.h2>
                        <Typography.p>{perfectlyBalanceYourPlate}</Typography.p>
                    </div>
                )}
            </Wrapper>
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

    const image: ImageProps = {};

    if (recipe.image) {
        const srcDir = path.join(process.cwd(), 'src/data/images');
        const destDir = path.join(process.cwd(), 'public/processed');

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const imagePath = recipe.image;
        const srcPath = path.join(srcDir, imagePath);
        const destPath = path.join(destDir, imagePath);

        if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
            fs.copyFileSync(srcPath, destPath);
        }

        image.src = `/processed/${imagePath}`;
    }

    return {
        props: {
            recipe,
            image,
        },
    };
}