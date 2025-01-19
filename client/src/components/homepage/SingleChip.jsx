import { Chip } from "@heroui/react"
import React, { useEffect, useState } from 'react'
import { chipColors } from '../../utils/colors'




function SingleChip({ data }) {

    

    return (
        <div className='cursor-pointer'>
            <Chip
                key={data._id}
                startContent={<p>{data.category_emoji}</p>}
                size="lg"
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