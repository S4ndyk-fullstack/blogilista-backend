const listHelper = require('../util/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const list = require('./example_blogs')
  test('when lista has many likes are summed', () => {
    const result = listHelper.totalLikes(list.blogs)
    expect(result).toBe(36)
  }) 
  test('find author with most blogs', () => {
    const result = listHelper.mostBlogs(list.blogs)
    expect(result).toEqual({
        author: 'Robert C. Martin',
        blogs: 3
    })
  }) 
  test('find author with most likes', () => {
    const result = listHelper.mostLikes(list.blogs)
    expect(result).toBe({
        author: 'Edsgar Dijkstra',
        likes: 17
    })
  }) 

})