import { ApiProperty } from "@nestjs/swagger";

export class moiveInfoDTO {
    @ApiProperty()
    ma_phim: string

    @ApiProperty()
    ten_phim: string

    @ApiProperty()
    trailer: string

    @ApiProperty()
    hinh_anh: string

    @ApiProperty()
    mo_ta: string

    @ApiProperty()
    ngay_khoi_chieu: string

    @ApiProperty()
    danh_gia: number

    @ApiProperty()
    hot: boolean

    @ApiProperty()
    dang_chieu: boolean

    @ApiProperty()
    sap_chieu: boolean
}