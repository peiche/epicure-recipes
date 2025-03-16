import Link from 'next/link';
import { Recipe, RecipeLite } from "../interfaces/Recipe"
import { Card, CardBody, CardHeader, CardImage } from '@progress/kendo-react-layout';
import { Typography } from '@progress/kendo-react-common';

interface RecipeCardProps {
    recipe: Recipe | RecipeLite;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/recipe/${recipe.slug}`} style={{ textDecoration: 'none' }}>
            <Card orientation='vertical' style={{ height: '100%' }}>
                <CardImage
                    className='card-image'
                    src={`/processed/${recipe.image}`}
                    alt=''
                />
                <CardHeader style={{ border: 0 }}>
                    <Typography.h2 className='k-h5 !k-font-normal !k-mb-0'>{recipe.name}</Typography.h2>
                </CardHeader>
                {recipe.description && (
                    <CardBody className='!k-pt-0'>
                        <Typography.p className='overflow-ellipsis'>{recipe.description}</Typography.p>
                    </CardBody>
                )}
            </Card>
        </Link>
    )
}