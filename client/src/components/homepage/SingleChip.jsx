import { Chip } from "@heroui/react"
import React, { useEffect, useState } from 'react'
import { chipColors } from '../../utils/colors'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'


function SingleChip({ data }) {






    //console.log(screens);
    const fullConfig = resolveConfig(tailwindConfig)

    const screenSizes = {
        sm: parseInt(fullConfig.theme.screens.sm.replaceAll("px", "")),
        md: parseInt(fullConfig.theme.screens.md.replaceAll("px", "")),
        lg: parseInt(fullConfig.theme.screens.lg.replaceAll("px", ""))
    }

    const currentWindowWidth = window.screen.width;
    //console.log(screenSizes);
    return (
        <div className='cursor-pointer'>
            <Chip
                key={data._id}
                startContent={<p>{data.category_emoji}</p>}
                size={(currentWindowWidth > screenSizes['lg']) ? "lg" : ((currentWindowWidth <= screenSizes['md']) ? "md" : ((currentWindowWidth <= screenSizes['sm']) ? "sm" : "lg"))}
                //color="success"
                radius='sm'
                // classNames={{
                //     base: `bg-${tp.category_color}-500`,
                //     content: "drop-shadow shadow-black text-white",
                //   }}
                className={chipColors[data.category_color]}
                variant="flat"
            >{data.category_name}</Chip>
        </div>
    )
}

export default SingleChip