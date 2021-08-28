import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example:
      'Placa de Vídeo Gigabyte NVIDIA GeForce RTX 3080 Ti VISION OC 12G LHR, 12 GB GDDR6X, RGB Fusion 2.0, Ray Tracing, DLSS - GV-N308TVISION OC-12GD',
  })
  readonly title: string;

  @ApiProperty({
    example:
      '<h2>Placa de V&iacute;deo Gigabyte NVIDIA GeForce RTX 3080 Ti VISION OC 12G&nbsp;LHR</h2>' +
      '<h2>&nbsp;</h2>' +
      '<h3>Crie Seu Trabalho Mais R&aacute;pido do Que Nunca</h3>' +
      '<p>As poderosas s&eacute;ries GeForce RTX &trade; 30 VISION aceleram seu trabalho com incr&iacute;veis melhorias no desempenho. Esteja voc&ecirc; fazendo EDI&Ccedil;&Atilde;O DE V&Iacute;DEO, ANIMA&Ccedil;&Atilde;O 3D, FOTOGRAFIA, DESIGN GR&Aacute;FICO, VISUALIZA&Ccedil;&Atilde;O DE ARQUITETURA ou TRANSMISS&Atilde;O, voc&ecirc; pode economizar muito tempo.</p>' +
      '<p>&nbsp;</p>' +
      '<h3>Sistema De Refrigera&ccedil;&atilde;o Windforce 3X</h3>' +
      '<p>O sistema de resfriamento WINDFORCE 3X possui dois ventiladores de l&acirc;mina exclusivos de 90 mm e um de 80 mm, rota&ccedil;&atilde;o alternada, 7 tubos de calor de cobre composto, uma grande placa de cobre com contato direto com a GPU, ventiladores ativos 3D e resfriamento de tela, que juntos fornecem dissipa&ccedil;&atilde;o de calor de alta efici&ecirc;ncia</p>' +
      '<p>&nbsp;</p>' +
      '<h3>Alternate Spinning</h3>' +
      '<p>A rota&ccedil;&atilde;o alternativa pode reduzir a turbul&ecirc;ncia dos ventiladores adjacentes e aumentar a press&atilde;o do ar.</p>' +
      '<p>&nbsp;</p>' +
      '<h3>Ventilador Ativo 3D</h3>' +
      '<p>O 3D Active Fan fornece resfriamento semipassivo, e os ventiladores permanecer&atilde;o desligados quando a GPU estiver em um jogo de baixa carga ou baixo consumo de energia.</p>' +
      '<p>&nbsp;</p>' +
      '<h3>Ventilador de L&acirc;mina &Uacute;nica</h3>' +
      '<p>O fluxo de ar &eacute; derramado pela borda triangular do leque e guiado suavemente pela curva da faixa 3D na superf&iacute;cie do leque.</p>' +
      '<p>&nbsp;</p>' +
      '<h3>RGB FUSION 2.0</h3>' +
      '<p>Com 16,7 milh&otilde;es de op&ccedil;&otilde;es de cores personaliz&aacute;veis ??e v&aacute;rios efeitos de ilumina&ccedil;&atilde;o, voc&ecirc; pode escolher os efeitos de ilumina&ccedil;&atilde;o ou sincronizar com outros dispositivos AORUS.</p>',
  })
  readonly description: string;

  @ApiProperty({
    example: 12941.06,
  })
  readonly price: number;

  @ApiProperty({
    example: 15,
  })
  readonly discount_percentage: number;

  @ApiProperty({
    example: '1 ano de garantia',
  })
  readonly warranty: string;

  @ApiProperty({
    example: true,
  })
  readonly available?: boolean;
}
