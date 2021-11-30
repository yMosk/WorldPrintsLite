USE [WorldPrints]
GO
/****** Object:  StoredProcedure [dbo].[Products_Search]    Script Date: 11/30/2021 2:56:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Yana Moskalova
-- Create date: 11/24/2021
-- Description: Search(Paginated) from table dbo.Products
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Products_Search]
@pageIndex int
,@pageSize int
,@query nvarchar(50)

AS
/*------Test Code------

DECLARE  @pageIndex int = 0
        ,@pageSize int = 4
        ,@query nvarchar(50) = 'Cotton'

EXECUTE [dbo].[Products_Search]	 @pageIndex
                                ,@pageSize
                                ,@query

*/
BEGIN

DECLARE @offset int = @pageIndex * @pageSize

SELECT   p.[Id]
        ,p.[SKU]
        ,p.[Name]
        ,p.[Manufacturer]
        ,p.[Year]
        ,p.[Description]
        ,p.[Specifications]

        ,pc.[Id] as CategoryId
        ,pc.[Name] as CategoryName
        ,pc.[Description] as CategoryDescription
        ,pc.[ImageId] as CategoryImage

        ,pst.[Id] as SizeId
        ,pst.[Name] as SizeType

        ,c.[Id] as ColorId
        ,c.[Name] as ColorName
        ,c.[Hex] as ColorHex

        ,pct.[Id] as ConditionId
        ,pct.[Name] as ConditionType

        ,p.[Material]
        ,p.[IsVisible]
        ,p.[IsActive]
        ,p.[PrimaryImage]

        ,up.[UserId] as CreatedById
        ,up.[FirstName] as CreatedByFirstName
        ,up.[LastName] as CreatedByLastName
        ,up.[AvatarUrl] as CreatedByAvatarUrl

        ,up2.[UserId] as ModifiedById
        ,up2.[FirstName] as ModifiedByFirstName
        ,up2.[LastName] as ModifiedByLastName
        ,up2.[AvatarUrl] as ModifiedByAvatarUrl

        ,p.[DateCreated]
        ,p.[DateModified]

        ,[TotalCount] = COUNT(1) OVER()

  FROM [dbo].[Products] as p
  inner join [dbo].[UserProfiles] as up
	on p.CreatedBy = up.UserId 
  inner join [dbo].[UserProfiles] as up2
	on p.ModifiedBy = up2.UserId
  inner join [dbo].[ProductConditionTypes] as pct
	on p.ConditionTypeId = pct.Id 
  inner join [dbo].[Colors] as c
	on p.ColorId = c.Id 
  inner join [dbo].[ProductSizeTypes] as pst
	on p.ProductSizeTypeId = pst.Id 
  inner join [dbo].[ProductCategory] as pc
	on p.CategoryId = pc.CategoryId

	WHERE
        (p.[Name] LIKE '%' + @query + '%' OR
        p.[Manufacturer] LIKE '%' + @query + '%' OR
        p.[Description] LIKE '%' + @query + '%' OR
        p.[Specifications] LIKE '%' + @query + '%' OR
        pc.[Name] LIKE '%' + @query + '%' OR
        pc.[Description] LIKE '%' + @query + '%' OR
        pst.[Name] LIKE '%' + @query + '%' OR
        c.[Name] LIKE '%' + @query + '%' OR
        pct.[Name] LIKE '%' + @query + '%' OR
        p.[Material] LIKE '%' + @query + '%')

  ORDER BY p.[Id]

OFFSET @offSet Rows
FETCH NEXT @pageSize Rows ONLY 

END