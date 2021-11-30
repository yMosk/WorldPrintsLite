USE [WorldPrints]
GO
/****** Object:  StoredProcedure [dbo].[Products_Insert]    Script Date: 11/30/2021 2:55:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Yana Moskalova
-- Create date: 11/05/2021
-- Description: Insert into table dbo.Products
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Products_Insert]
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
,@createdBy int
,@modifiedBy int
,@id int OUTPUT

AS
/*------Test Code------

DECLARE @sku nvarchar(50) = 'RB'
		,@name nvarchar(255) = 'Insert test'
		,@manufacturer nvarchar(100) = 'Insert test'
		,@year int = 1
		,@description nvarchar(4000) = 'Insert test'
		,@specifications nvarchar(max) = 'Insert test'
		,@categoryId int = 1
		,@productSizeTypeId int = 1
		,@colorId int = 1
		,@conditionTypeId int = 1
		,@material nvarchar(250) = 'Insert test'
		,@isVisible bit = 1
		,@isActive bit = 1
		,@primaryImage nvarchar(250) = 'Insert test'
		,@createdBy int = 1 
		,@modifiedBy int = 1
		,@id int = 0

EXECUTE [dbo].[Products_Insert]	@sku
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
								,@createdBy
								,@modifiedBy
								,@id OUTPUT

SELECT *
FROM dbo.Products
WHERE Id = @id

*/
BEGIN

INSERT INTO [dbo].[Products]
           ([SKU]
           ,[Name]
           ,[Manufacturer]
           ,[Year]
           ,[Description]
           ,[Specifications]
           ,[CategoryId]
           ,[ProductSizeTypeId]
           ,[ColorId]
           ,[ConditionTypeId]
           ,[Material]
           ,[IsVisible]
           ,[IsActive]
           ,[PrimaryImage]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (@sku
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
           ,@createdBy
           ,@modifiedBy)
		SET @id = SCOPE_IDENTITY()

END