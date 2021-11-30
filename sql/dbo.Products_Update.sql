USE [WorldPrints]
GO
/****** Object:  StoredProcedure [dbo].[Products_Update]    Script Date: 11/30/2021 2:56:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Yana Moskalova
-- Create date: 11/05/2021
-- Description: Update byId table dbo.Products
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Products_Update]
@sku nvarchar(50)
,@name nvarchar(255)
,@manufacturer nvarchar(100)
,@year int
,@description nvarchar(4000)
,@specifications nvarchar(max)
,@categoryId int
,@productSizeTypeId int
,@colorId int
,@conditionTypeId int
,@material nvarchar(250)
,@isVisible bit
,@isActive bit
,@primaryImage nvarchar(250)
,@modifiedBy int
,@id int

AS
/*------Test Code------

DECLARE @sku nvarchar(50) = 'RB'
		,@name nvarchar(255) = 'Update test'
		,@manufacturer nvarchar(100) = 'Update test'
		,@year int = 2020
		,@description nvarchar(4000) = 'Update test'
		,@specifications nvarchar(max) = 'Update test'
		,@categoryId int = 1
		,@productSizeTypeId int = 1
		,@colorId int = 1
		,@conditionTypeId int = 1
		,@material nvarchar(250) = 'Update test'
		,@isVisible bit = 1
		,@isActive bit = 1
		,@primaryImage nvarchar(250) = 'Update test'
		,@modifiedBy int = 1
		,@id int = 1

SELECT *
FROM dbo.Products
WHERE Id = @id

EXECUTE [dbo].[Products_Update] @sku
								,@name
								,@manufacturer
								,@year
								,@description
								,@specifications
								,@categoryId
								,@productSizeTypeId
								,@colorId
								,@conditionTypeId
								,@material
								,@isVisible
								,@isActive
								,@primaryImage
								,@modifiedBy
								,@id

SELECT *
FROM dbo.Products
WHERE Id = @id

*/
BEGIN

DECLARE @dateModified datetime2(7) = GETUTCDATE()

UPDATE [dbo].[Products]
   SET [SKU] = @sku
      ,[Name] = @name
      ,[Manufacturer] = @manufacturer
      ,[Year] = @year
      ,[Description] = @description
      ,[Specifications] = @specifications
      ,[CategoryId] = @categoryId
      ,[ProductSizeTypeId] = @productSizeTypeId
      ,[ColorId] = @colorId
      ,[ConditionTypeId] = @conditionTypeId
      ,[Material] = @material
      ,[IsVisible] = @isVisible
      ,[IsActive] = @isActive
      ,[PrimaryImage] = @primaryImage
      ,[DateModified] = @dateModified
      ,[ModifiedBy] = @modifiedBy
 WHERE [Id] = @id

END