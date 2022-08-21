import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

type PagingResult = {
  items: any[];
  total: number;
  page: number;
  limit: number;
};

@Injectable()
export class HeadersPaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(({ items, total, page, limit }: PagingResult) => {
        const response = context.switchToHttp().getResponse();
        const route = `${process.env.API_URL}`;

        const { paging, links } = this.paginate({ total, page, limit, route });

        response.setHeader(
          'Link',
          `<${links.self}>; rel=self, <${links.first}>; rel=first, <${links.last}>; rel=last, <${links.next}>; rel=next`,
        );
        response.setHeader('X-Pagination-Current-Page', paging.currentPage);
        response.setHeader('X-Pagination-Page-Count', paging.pageCount);
        response.setHeader('X-Pagination-Per-Page', paging.perPage);
        response.setHeader('X-Pagination-Total-Count', paging.totalCount);

        return items;
      }),
    );
  }

  paginate({ total, page, limit, route }) {
    const pages = Math.ceil(total / limit);
    const prevPage = page <= 1 ? 1 : page - 1;
    const nextPage = page >= pages ? pages : page + 1;

    const paging = {
      totalCount: total,
      perPage: limit,
      pageCount: pages,
      currentPage: page,
    };

    const havePrevPage = pages > 1;
    const haveNextPage = pages > 1 && pages > page;

    const symbol = route && new RegExp(/\?/).test(route) ? '&' : '?';
    const links = {
      self: `${route}${symbol}page=${page}`,
      first: `${route}${symbol}page=1`,
      prev: havePrevPage ? `${route}${symbol}page=${prevPage}` : null,
      next: haveNextPage ? `${route}${symbol}page=${nextPage}` : null,
      last: haveNextPage ? `${route}${symbol}page=${pages}` : null,
    };
    return { paging, links };
  }
}
