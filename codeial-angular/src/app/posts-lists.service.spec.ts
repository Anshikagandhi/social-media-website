import { TestBed } from '@angular/core/testing';

import { PostsListsService } from './posts-lists.service';

describe('PostsListsService', () => {
  let service: PostsListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
